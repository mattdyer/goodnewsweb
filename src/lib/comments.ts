export interface Comment {
  id: string;
  articleLink: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string;
}

const comments: Map<string, Comment[]> = new Map();

export function getArticleComments(articleLink: string): Comment[] {
  return comments.get(articleLink) || [];
}

export function getUserComments(userId: string): Comment[] {
  const allComments: Comment[] = [];
  for (const articleComments of comments.values()) {
    allComments.push(...articleComments.filter(c => c.userId === userId));
  }
  return allComments;
}

export function addComment(articleLink: string, userId: string, userName: string, content: string): Comment {
  const articleComments = comments.get(articleLink) || [];
  
  const comment: Comment = {
    id: crypto.randomUUID(),
    articleLink,
    userId,
    userName,
    content,
    createdAt: new Date().toISOString(),
  };
  
  articleComments.push(comment);
  comments.set(articleLink, articleComments);
  
  return comment;
}

export function deleteComment(commentId: string, userId: string): boolean {
  for (const [articleLink, articleComments] of comments.entries()) {
    const index = articleComments.findIndex(c => c.id === commentId && c.userId === userId);
    if (index !== -1) {
      articleComments.splice(index, 1);
      if (articleComments.length === 0) {
        comments.delete(articleLink);
      }
      return true;
    }
  }
  return false;
}

export function getCommentCount(articleLink: string): number {
  return comments.get(articleLink)?.length || 0;
}

export { comments };
