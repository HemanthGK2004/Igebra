import React, { useState, useEffect } from 'react';
import { 
  Mic, 
  Square, 
  Play, 
  Pause,
  Save,
  Trash2,
  Loader2,
  FileAudio,
  Download
} from 'lucide-react';
import { useAudioRecorder } from '../../hooks/useAudioRecorder';
import { aiService } from '../../services/aiService';
import { storage } from '../../utils/storage';
import { Note } from '../../types';

const AudioNotes: React.FC = () => {
  const {
    isRecording,
    audioBlob,
    duration,startRecording,
    stopRecording,
    resetRecording
  } = useAudioRecorder();

  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcription, setTranscription] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Audio Notes');
  const [tags, setTags] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [audio, setAudio] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (audioBlob) {
      const url = URL.createObjectURL(audioBlob);
      setAudioUrl(url);
      const audioElement = new Audio(url);
      setAudio(audioElement);

      audioElement.addEventListener('ended', () => {
        setIsPlaying(false);
      });

      return () => {
        URL.revokeObjectURL(url);
        audioElement.removeEventListener('ended', () => {
          setIsPlaying(false);
        });
      };
    }
  }, [audioBlob]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTranscribe = async () => {
    if (!audioBlob) return;

    setIsTranscribing(true);
    try {
      const result = await aiService.transcribeAudio(audioBlob);
      setTranscription(result);
      if (!title) {
        setTitle(`Audio Note - ${new Date().toLocaleDateString()}`);
      }
    } catch (error) {
      console.error('Transcription error:', error);
      alert('Failed to transcribe audio. Please try again.');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handlePlayPause = () => {
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleSave = () => {
    if (!transcription.trim()) {
      alert('Please transcribe the audio first');
      return;
    }

    const now = new Date();
    const newNote: Note = {
      id: Date.now().toString(),
      title: title.trim() || `Audio Note - ${now.toLocaleDateString()}`,
      content: transcription.trim(),
      category,
      tags,
      createdAt: now,
      updatedAt: now,
      isStarred: false,
      audioUrl: audioUrl || undefined
    };

    const notes = storage.getNotes();
    const updatedNotes = [newNote, ...notes];
    storage.saveNotes(updatedNotes);

    // Reset form
    resetRecording();
    setTranscription('');
    setTitle('');
    setCategory('Audio Notes');
    setTags([]);
    setAudioUrl(null);
    setAudio(null);

    alert('Audio note saved successfully!');
  };

  const handleDownload = () => {
    if (!audioBlob) return;

    const url = URL.createObjectURL(audioBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audio-note-${Date.now()}.wav`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    resetRecording();
    setTranscription('');
    setTitle('');
    setAudioUrl(null);
    setAudio(null);
    setIsPlaying(false);
  };

  return (
    <div className="min-h-full p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-900">Audio Notes</h1>
          <p className="text-gray-600">Record and transcribe your voice notes with AI</p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* Recording Panel */}
          <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <h2 className="mb-6 text-xl font-semibold text-gray-900">Record Audio</h2>
            
            {/* Recording Status */}
            <div className="mb-8 text-center">
              <div className={`w-32 h-32 mx-auto rounded-full flex items-center justify-center mb-4 transition-all duration-300 ${
                isRecording 
                  ? 'bg-gradient-to-br from-red-100 to-red-200 animate-pulse' 
                  : 'bg-gradient-to-br from-blue-100 to-purple-100'
              }`}>
                <Mic className={`w-12 h-12 ${isRecording ? 'text-red-600' : 'text-blue-600'}`} />
              </div>
              
              <div className="space-y-2">
                <p className={`text-lg font-medium ${isRecording ? 'text-red-600' : 'text-gray-900'}`}>
                  {isRecording ? 'Recording...' : 'Ready to Record'}
                </p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatTime(duration)}
                </p>
              </div>
            </div>

            {/* Recording Controls */}
            <div className="flex justify-center mb-6 space-x-4">
              {!isRecording ? (
                <button
                  onClick={startRecording}
                  className="flex items-center px-8 py-3 space-x-2 font-medium text-white transition-all duration-200 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 rounded-xl"
                >
                  <Mic className="w-5 h-5" />
                  <span>Start Recording</span>
                </button>
              ) : (
                <button
                  onClick={stopRecording}
                  className="flex items-center px-8 py-3 space-x-2 font-medium text-white transition-all duration-200 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 rounded-xl"
                >
                  <Square className="w-5 h-5" />
                  <span>Stop Recording</span>
                </button>
              )}
            </div>

            {/* Audio Playback */}
            {audioBlob && (
              <div className="pt-6 border-t border-gray-100">
                <h3 className="mb-4 font-medium text-gray-900">Playback</h3>
                <div className="flex items-center justify-between">
                  <button
                    onClick={handlePlayPause}
                    className="flex items-center px-4 py-2 space-x-2 text-blue-700 transition-colors bg-blue-100 rounded-lg hover:bg-blue-200"
                  >
                    {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                    <span>{isPlaying ? 'Pause' : 'Play'}</span>
                  </button>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={handleDownload}
                      className="p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100"
                      title="Download Audio"
                    >
                      <Download className="w-4 h-4" />
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-2 text-gray-600 transition-colors rounded-lg hover:text-gray-900 hover:bg-gray-100"
                      title="Delete Recording"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Transcription Panel */}
          <div className="p-8 bg-white border border-gray-100 shadow-sm rounded-2xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Transcription</h2>
              <button
                onClick={handleTranscribe}
                disabled={!audioBlob || isTranscribing}
                className="flex items-center px-4 py-2 space-x-2 font-medium text-white transition-all duration-200 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isTranscribing ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileAudio className="w-4 h-4" />
                )}
                <span>{isTranscribing ? 'Transcribing...' : 'Transcribe'}</span>
              </button>
            </div>

            {/* Note Details */}
            <div className="mb-6 space-y-4">
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Title
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Enter note title..."
                  className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                >
                  <option value="Audio Notes">Audio Notes</option>
                  <option value="Lectures">Lectures</option>
                  <option value="Meetings">Meetings</option>
                  <option value="Ideas">Ideas</option>
                  <option value="Reminders">Reminders</option>
                </select>
              </div>
            </div>

            {/* Transcription Text */}
            <div className="mb-6">
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Transcribed Text
              </label>
              <textarea
                value={transcription}
                onChange={(e) => setTranscription(e.target.value)}
                placeholder="Transcribed text will appear here..."
                rows={8}
                className="w-full px-4 py-3 transition-all duration-200 border border-gray-200 resize-none rounded-xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            </div>

            {/* Save Button */}
            <button
              onClick={handleSave}
              disabled={!transcription.trim()}
              className="flex items-center justify-center w-full py-3 space-x-2 font-medium text-white transition-all duration-200 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-5 h-5" />
              <span>Save Audio Note</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioNotes;