import React, { useState } from "react";
import {
    MessageSquare,
    Eye,
    Clock,
    User,
    Share2,
    ChevronUp,
    ChevronDown,
    ArrowLeft,
    Send,
} from "lucide-react";
import { Link, useParams } from "react-router-dom";
import { CommentType, ThreadType, commentsArr, threads } from "./data";

const ThreadContent: React.FC<{ thread: ThreadType }> = ({ thread }) => {
    const [votes, setVotes] = useState(thread.upvotes - thread.downvotes);

    const handleUpvote = () => setVotes(votes + 1);
    const handleDownvote = () => setVotes(votes - 1);

    return (
        <div className="overflow-hidden rounded-lg bg-white shadow-md">
            <div className="p-6">
                <div className="mb-4 flex items-center justify-between">
                    <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-semibold text-indigo-800">
                        {thread.category}
                    </span>
                    <div className="flex items-center space-x-2">
                        <button
                            onClick={handleUpvote}
                            className="text-gray-500 transition-colors duration-200 hover:text-green-600"
                        >
                            <ChevronUp className="h-6 w-6" />
                        </button>
                        <span className="text-lg font-semibold text-gray-700">
                            {votes}
                        </span>
                        <button
                            onClick={handleDownvote}
                            className="text-gray-500 transition-colors duration-200 hover:text-red-600"
                        >
                            <ChevronDown className="h-6 w-6" />
                        </button>
                    </div>
                </div>
                <h1 className="mb-4 text-3xl font-bold text-gray-800">
                    {thread.title}
                </h1>
                <p className="mb-6 text-gray-600">{thread.content}</p>
                <div className="mb-6 flex flex-wrap gap-2">
                    {thread.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full bg-slate-100 px-3 py-1 text-sm text-slate-800"
                        >
                            {tag}
                        </span>
                    ))}
                </div>
                <div className="mt-5 flex items-center justify-between border-t pt-5 text-sm text-slate-500">
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <User className="-mt-px mr-1.5 h-4 w-4" />
                            {thread.author}
                        </span>
                        <span className="flex items-center">
                            <Clock className="mr-1.5 h-4 w-4" />
                            {new Date(thread.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                            <MessageSquare className="mr-1 h-4 w-4" />
                            {thread.replies} replies
                        </span>
                        <span className="flex items-center">
                            <Eye className="mr-1 h-4 w-4" />
                            {thread.views} views
                        </span>
                        <button className="flex items-center transition-colors duration-200 hover:text-indigo-600">
                            <Share2 className="mr-1 h-4 w-4" />
                            Share
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const Comment: React.FC<{ comment: CommentType }> = ({ comment }) => {
    const [votes, setVotes] = useState(comment.upvotes - comment.downvotes);

    const handleUpvote = () => setVotes(votes + 1);
    const handleDownvote = () => setVotes(votes - 1);

    return (
        <div className="rounded-lg bg-white p-5 py-6 shadow-md">
            <div className="flex items-start">
                <div className="mr-5 flex flex-col items-center">
                    <button
                        onClick={handleUpvote}
                        className="text-gray-500 transition-colors duration-200 hover:text-indigo-600"
                    >
                        <ChevronUp className="h-5 w-5" />
                    </button>
                    <span className="my-1 font-semibold text-gray-700">
                        {votes}
                    </span>
                    <button
                        onClick={handleDownvote}
                        className="text-gray-500 transition-colors duration-200 hover:text-indigo-600"
                    >
                        <ChevronDown className="h-5 w-5" />
                    </button>
                </div>
                <div className="flex-grow">
                    <div className="mb-2 flex items-center">
                        <div className="mr-2 flex h-8 w-8 items-center justify-center rounded-full bg-indigo-100 font-semibold text-indigo-600">
                            {comment.author[0].toUpperCase()}
                        </div>
                        <span className="font-medium text-gray-800">
                            {comment.author}
                        </span>
                        <span className="ml-2 text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                    </div>
                    <p className="text-gray-600">{comment.content}</p>
                </div>
            </div>
        </div>
    );
};

function CommentForm({
    setComments,
}: {
    setComments: React.Dispatch<React.SetStateAction<CommentType[]>>;
}) {
    const [comment, setComment] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!comment.trim()) return;
        const newComment = {
            id: String(commentsArr.length + 1),
            content: comment,
            author: "Anonymous",
            upvotes: 0,
            downvotes: 0,
            createdAt: new Date().toISOString(),
        };
        setComments((comments) => [...comments, newComment]);
        commentsArr.push(newComment);
        setComment("");
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="rounded-lg bg-white p-6 shadow-md"
        >
            <h3 className="mb-4 text-xl font-semibold text-slate-800">
                Add a Comment
            </h3>
            <div className="mb-4">
                <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="w-full rounded-lg border border-slate-300 p-3 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    rows={4}
                    placeholder="Write your comment..."
                />
            </div>
            <button
                type="submit"
                className="flex items-center rounded-lg bg-slate-800 px-4 py-2 text-white transition-colors duration-200 hover:bg-slate-900"
            >
                <Send className="mr-2 h-4 w-4" />
                Post Comment
            </button>
        </form>
    );
}

export default function ThreadPage() {
    const { threadId } = useParams<{ threadId: string }>();
    console.log(threadId);
    const [comments, setComments] = useState(commentsArr);
    console.log(
        threads.findIndex((t) => t.id == (threadId ?? "1")),
        threadId,
    );
    return (
        <div className="min-h-screen bg-slate-100">
            <div className="container mx-auto px-4 py-8">
                <Link
                    to="/forum"
                    className="mb-6 inline-flex items-center text-indigo-600 hover:underline"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Forum
                </Link>
                <div className="space-y-6">
                    <ThreadContent
                        thread={
                            threads[
                                threads.findIndex(
                                    (t) => t.id == (threadId ?? "1"),
                                )
                            ]
                        }
                    />
                    <h2 className="pl-2 text-2xl font-bold text-slate-800">
                        Comments ({comments.length})
                    </h2>
                    <CommentForm setComments={setComments} />
                    <div className="space-y-4">
                        {comments.map((comment) => (
                            <Comment key={comment.id} comment={comment} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
