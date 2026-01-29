"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { 
  ArrowLeft, 
  Trophy, 
  Clock, 
  Users, 
  Calendar,
  Star,
  Target,
  TrendingUp,
  Award,
  Play,
  BookOpen,
  CheckCircle,
  AlertCircle,
  User
} from "lucide-react";
import { RootState, AppDispatch } from "@/store";
import { Challenge } from "@/types/challenge";
import { challengeService } from "@/services/challengeService";
import Link from "next/link";

const ChallengeDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { user } = useSelector((state: RootState) => state.auth);
  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isParticipating, setIsParticipating] = useState(false);

  const challengeId = params.id as string;

  useEffect(() => {
    const fetchChallenge = async () => {
      try {
        setLoading(true);
        const challengeData = await challengeService.getChallengeById(challengeId);
        setChallenge(challengeData);
      } catch (err) {
        setError("Failed to load challenge details");
        console.error("Error fetching challenge:", err);
      } finally {
        setLoading(false);
      }
    };

    if (challengeId) {
      fetchChallenge();
    }
  }, [challengeId]);

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return <Target className="h-5 w-5" />;
      case 'medium': return <TrendingUp className="h-5 w-5" />;
      case 'hard': return <Award className="h-5 w-5" />;
      default: return <Trophy className="h-5 w-5" />;
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-800';
      case 'medium': return 'bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 border-yellow-200 dark:border-yellow-800';
      case 'hard': return 'bg-red-100 dark:bg-red-900/20 text-red-800 dark:text-red-400 border-red-200 dark:border-red-800';
      default: return 'bg-gray-100 dark:bg-gray-900/20 text-gray-800 dark:text-gray-400 border-gray-200 dark:border-gray-800';
    }
  };

  const handleParticipate = () => {
    // TODO: Implement participation logic
    setIsParticipating(true);
    console.log("Participating in challenge:", challengeId);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-light"></div>
      </div>
    );
  }

  if (error || !challenge) {
    return (
      <div className="space-y-8">
        <div className="flex items-center gap-4">
          <Link href="/dashboard/challenges">
            <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
              <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
            </button>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Challenge Not Found</h1>
        </div>
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-8 text-center">
          <AlertCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-red-900 dark:text-red-400 mb-2">Challenge Not Found</h3>
          <p className="text-red-700 dark:text-red-300 mb-6">{error || "The challenge you're looking for doesn't exist."}</p>
          <Link href="/dashboard/challenges">
            <button className="bg-blue-light hover:bg-blue-dark text-white px-6 py-3 rounded-lg font-medium transition-colors">
              Back to Challenges
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/challenges">
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors">
            <ArrowLeft className="h-5 w-5 text-gray-600 dark:text-gray-400" />
          </button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <Trophy className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
            <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(challenge.difficulty)}`}>
              {getDifficultyIcon(challenge.difficulty)}
              {challenge.difficulty.charAt(0).toUpperCase() + challenge.difficulty.slice(1)}
            </span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{challenge.title}</h1>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Challenge Description */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              Challenge Description
            </h2>
            <div className="prose dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
                {challenge.description}
              </p>
            </div>
          </div>

          {/* Challenge Requirements */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
              Requirements & Objectives
            </h2>
            <div className="space-y-4">
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
                <h3 className="font-medium text-blue-900 dark:text-blue-300 mb-2">What you'll learn:</h3>
                <ul className="text-sm text-blue-800 dark:text-blue-400 space-y-1">
                  <li>• Problem-solving and analytical thinking</li>
                  <li>• Technical skills relevant to the challenge</li>
                  <li>• Best practices and industry standards</li>
                  <li>• Collaboration and communication skills</li>
                </ul>
              </div>
              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
                <h3 className="font-medium text-green-900 dark:text-green-300 mb-2">Prerequisites:</h3>
                <ul className="text-sm text-green-800 dark:text-green-400 space-y-1">
                  <li>• Basic understanding of the topic area</li>
                  <li>• Access to required tools and resources</li>
                  <li>• Commitment to complete within the timeframe</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Challenge Stats */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Challenge Details</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <Clock className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Duration</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">{challenge.duration} days</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <Users className="h-4 w-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Participants</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">0 joined</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                  <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Created</p>
                  <p className="font-medium text-gray-900 dark:text-gray-100">
                    {new Date(challenge.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
              {challenge.createdBy && (
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <User className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Created by</p>
                    <p className="font-medium text-gray-900 dark:text-gray-100">Challenge Creator</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
            <div className="space-y-4">
              {!isParticipating ? (
                <button
                  onClick={handleParticipate}
                  className="w-full bg-blue-light hover:bg-blue-dark text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
                >
                  <Play className="h-5 w-5" />
                  Join Challenge
                </button>
              ) : (
                <div className="text-center">
                  <div className="w-full bg-green-600 text-white py-3 px-4 rounded-lg font-semibold flex items-center justify-center gap-2 mb-3">
                    <CheckCircle className="h-5 w-5" />
                    Participating
                  </div>
                  <button className="w-full bg-blue-light hover:bg-blue-dark text-white py-2 px-4 rounded-lg font-medium transition-colors">
                    View Progress
                  </button>
                </div>
              )}
              
              <button className="w-full border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 py-2 px-4 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <Star className="h-4 w-4" />
                Save for Later
              </button>
            </div>
          </div>

          {/* Progress Tracker (if participating) */}
          {isParticipating && (
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700 shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Your Progress</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Completion</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">0%</span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-light h-2 rounded-full" style={{ width: '0%' }}></div>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600 dark:text-gray-400">Time remaining</span>
                  <span className="font-medium text-gray-900 dark:text-gray-100">{challenge.duration} days</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChallengeDetailPage;