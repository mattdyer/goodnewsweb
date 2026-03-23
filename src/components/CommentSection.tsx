'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Comment, useCommentsContext } from '@/context/CommentsContext';

interface CommentItemProps {
  comment: Comment;
  isOwner: boolean;
  onDelete: (commentId: string) => void;
}

function CommentItem({ comment, isOwner, onDelete }: CommentItemProps) {
  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="flex-shrink-0 w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
        <span className="text-sm font-medium text-green-700">
          {comment.userName.charAt(0).toUpperCase()}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-medium text-gray-900 text-sm">{comment.userName}</span>
          <span className="text-xs text-gray-400">{formatDate(comment.createdAt)}</span>
        </div>
        <p className="text-gray-700 text-sm">{comment.content}</p>
        {isOwner && (
          <button
            onClick={() => onDelete(comment.id)}
            className="mt-1 text-xs text-gray-400 hover:text-red-500 transition-colors"
          >
            Delete
          </button>
        )}
      </div>
    </div>
  );
}

interface CommentSectionProps {
  articleLink: string;
}

export default function CommentSection({ articleLink }: CommentSectionProps) {
  const { data: session } = useSession();
  const { articleComments, fetchComments, addComment, removeComment } = useCommentsContext();
  const [newComment, setNewComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const comments = articleComments.get(articleLink) || [];

  const loadComments = async () => {
    await fetchComments(articleLink);
  };

  const handleToggle = async () => {
    if (!expanded) {
      await loadComments();
    }
    setExpanded(!expanded);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || submitting) return;

    setSubmitting(true);
    try {
      await addComment(articleLink, newComment.trim());
      setNewComment('');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (commentId: string) => {
    await removeComment(commentId, articleLink);
  };

  return (
    <div className="mt-4 border-t border-gray-200 pt-4">
      <button
        onClick={handleToggle}
        className="flex items-center gap-2 text-sm text-gray-600 hover:text-green-600 transition-colors flex-shrink-0"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        <span>{comments.length} {comments.length === 1 ? 'comment' : 'comments'}</span>
        <svg
          className={`w-4 h-4 transition-transform ${expanded ? 'rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {expanded && (
        <div className="mt-4">
          {session ? (
            <form onSubmit={handleSubmit} className="mb-4">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                maxLength={1000}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-400">{newComment.length}/1000</span>
                <button
                  type="submit"
                  disabled={!newComment.trim() || submitting}
                  className="px-4 py-1.5 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {submitting ? 'Posting...' : 'Post'}
                </button>
              </div>
            </form>
          ) : (
            <p className="text-sm text-gray-500 mb-4 p-3 bg-gray-50 rounded-lg">
              Sign in to join the discussion
            </p>
          )}

          {comments.length > 0 ? (
            <div className="space-y-0">
              {comments.map((comment) => (
                <CommentItem
                  key={comment.id}
                  comment={comment}
                  isOwner={session?.user?.id === comment.userId}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-4">
              No comments yet. Be the first to share your thoughts!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
