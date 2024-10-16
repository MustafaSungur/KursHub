import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ThumbsUp, Edit, Trash2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";
import {
  fetchCommentByContentId,
  createCommentAction,
  updateCommentAction,
  deleteCommentAction,
} from "@/app/features/comment/commentAction";
import { AppDispatch } from "@/app/store";
import {
  createCommentLikeAction,
  deleteCommentLikeAction,
} from "@/app/features/commentLike/commentLikeAction";

interface Like {
  userId: string;
  id: number;
}

export default function CommentSection({ contentId }: { contentId: number }) {
  const dispatch = useDispatch<AppDispatch>();

  const { userInfo } = useSelector((state: any) => state.auth);
  const {
    commentLoading,
    commentError,
    commentData = [],
  } = useSelector((state: any) => state.comment);

  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");

  useEffect(() => {
    dispatch(fetchCommentByContentId(contentId));
  }, [dispatch]);

  if (commentLoading) {
    return <LoadingSpinner />;
  }
  if (commentError) {
    return <ErrorMessage message={commentError} />;
  }

  const handleEditComment = (id: number, text: string) => {
    setEditingCommentId(id);
    setEditedCommentText(text);
  };

  const handleAddComment = () => {
    if (newComment.trim()) {
      dispatch(
        createCommentAction({
          contentId,
          userId: userInfo.userID,
          description: newComment,
        })
      ).then(() => {
        dispatch(fetchCommentByContentId(contentId)); // Refetch comments after adding a comment
      });
      setNewComment("");
    }
  };

  const handleSaveEdit = () => {
    if (editingCommentId !== null) {
      dispatch(
        updateCommentAction({
          id: editingCommentId,
          comment: {
            description: editedCommentText,
            userId: userInfo.userID,
            contentId: contentId,
          },
        })
      ).then(() => {
        dispatch(fetchCommentByContentId(contentId)); // Refetch comments after updating
      });
      setEditingCommentId(null);
      setEditedCommentText("");
    }
  };

  const handleDeleteComment = (id: number) => {
    dispatch(deleteCommentAction(id)).then(() => {
      dispatch(fetchCommentByContentId(contentId)); // Refetch comments after deleting
    });
  };

  const handleToggleLike = (
    commentId: number,
    likes: Like[],
    hasLiked: boolean
  ) => {
    const commentLike = likes.find((cl) => cl.userId === userInfo.userID);
    if (hasLiked && commentLike) {
      dispatch(deleteCommentLikeAction(commentLike.id)).then(() => {
        dispatch(fetchCommentByContentId(contentId)); // Refetch comments after unlike
      });
    } else {
      dispatch(
        createCommentLikeAction({
          commentId,
          userId: userInfo.userID,
        })
      ).then(() => {
        dispatch(fetchCommentByContentId(contentId)); // Refetch comments after like
      });
    }
  };

  console.log(commentData);
  return (
    <section>
      <div className="space-y-4">
        <h3 className="text-xl font-semibold">Yorum Ekle</h3>
        <Textarea
          maxLength={300}
          placeholder="Yorumunuzu buraya yazın..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <Button
          onClick={handleAddComment}
          className="bg-amber-500 hover:bg-amber-600 text-slate-100 rounded-xl"
        >
          Gönder
        </Button>
      </div>
      <h2 className="text-2xl font-semibold mb-6 mt-8">Yorumlar</h2>
      <div className="space-y-6 mb-8">
        {Array.isArray(commentData.$values) &&
          commentData?.$values.map((comment: any) => {
            const hasLiked = comment.likes?.$values.some(
              (like: any) => like.userId === userInfo.userID
            );

            return (
              <div key={comment.id} className="flex space-x-4 pt-3">
                <Avatar>
                  <AvatarImage
                    src={comment.user.image}
                    alt={comment.user.firstName}
                  />
                  <AvatarFallback>
                    {comment.user.firstName[0] + comment.user.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>
                      <h3 className="font-semibold inline-block">
                        {comment.user.firstName} {comment.user.lastName}
                      </h3>
                      <span className="text-sm text-gray-500 ml-2">
                        {comment.updatedDate && "(Düzenlendi)"}
                      </span>
                    </span>
                    <span className="text-sm text-gray-500">
                      {new Date(comment.createdDate).toLocaleDateString()}
                    </span>
                  </div>
                  {editingCommentId === comment.id ? (
                    <div className="mt-2">
                      <Textarea
                        maxLength={300}
                        value={editedCommentText}
                        onChange={(e) => setEditedCommentText(e.target.value)}
                        className="mb-2"
                      />
                      <Button
                        onClick={handleSaveEdit}
                        size="sm"
                        className="mr-2 bg-amber-500 hover:bg-amber-600 text-slate-100"
                      >
                        Kaydet
                      </Button>
                      <Button
                        onClick={() => setEditingCommentId(null)}
                        size="sm"
                        variant="outline"
                      >
                        İptal
                      </Button>
                    </div>
                  ) : (
                    <>
                      <div className="p-2 mb-2 rounded-md">
                        <p className="text-gray-700 mt-1 w-full max-w-full max-h-20 overflow-hidden overflow-ellipsis whitespace-normal">
                          {comment.description}
                        </p>
                      </div>
                      <div className="flex items-center mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          className={`text-gray-500 hover:text-amber-500 ${
                            hasLiked ? "text-amber-500" : ""
                          }`}
                          onClick={() =>
                            handleToggleLike(
                              comment.id,
                              comment.likes.$values,
                              hasLiked
                            )
                          }
                        >
                          <ThumbsUp className="h-4 w-4 mr-1" />
                          {comment.likes?.$values.length || 0}
                        </Button>
                        {comment.user.id === userInfo.userID && (
                          <>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-gray-700 ml-2"
                              onClick={() =>
                                handleEditComment(
                                  comment.id,
                                  comment.description
                                )
                              }
                            >
                              <Edit className="h-4 w-4 mr-1" />
                              Düzenle
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-gray-500 hover:text-red-700 ml-2"
                              onClick={() => handleDeleteComment(comment.id)}
                            >
                              <Trash2 className="h-4 w-4 mr-1" />
                              Sil
                            </Button>
                          </>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            );
          })}
      </div>
    </section>
  );
}
