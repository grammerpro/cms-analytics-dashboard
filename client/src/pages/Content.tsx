import React, { useState } from 'react';
import toast from 'react-hot-toast';
import ConfirmDialog from '../components/common/ConfirmDialog';
import LoadingSpinner from '../components/common/LoadingSpinner';
import Tooltip from '../components/common/Tooltip';
import { formatFriendlyDate, formatDateTime } from '../utils/dateFormatter';

interface ContentItem {
  id: number;
  title: string;
  status: 'draft' | 'published';
  author: string;
  lastModified: string;
}

const Content: React.FC = () => {
    const [contentItems, setContentItems] = useState<ContentItem[]>([
        { id: 1, title: 'Getting Started Guide', status: 'published', author: 'John Doe', lastModified: '2024-01-15' },
        { id: 2, title: 'API Documentation', status: 'draft', author: 'Jane Smith', lastModified: '2024-01-14' },
        { id: 3, title: 'User Manual', status: 'published', author: 'Bob Wilson', lastModified: '2024-01-13' },
    ]);
    const [isLoading, setIsLoading] = useState(false);
    const [deleteDialog, setDeleteDialog] = useState<{ isOpen: boolean; itemId: number | null }>({
        isOpen: false,
        itemId: null,
    });

    const handlePublish = (id: number) => {
        setIsLoading(true);
        setTimeout(() => {
            setContentItems(items =>
                items.map(item =>
                    item.id === id ? { ...item, status: 'published' as const } : item
                )
            );
            setIsLoading(false);
            toast.success('Content published successfully! 🎉', {
                duration: 3000,
            });
        }, 500);
    };

    const handleEdit = (id: number) => {
        toast('Edit feature coming soon!', { icon: '✏️' });
    };

    const confirmDelete = (id: number) => {
        setDeleteDialog({ isOpen: true, itemId: id });
    };

    const handleDelete = () => {
        if (deleteDialog.itemId) {
            setIsLoading(true);
            setTimeout(() => {
                setContentItems(items => items.filter(item => item.id !== deleteDialog.itemId));
                setIsLoading(false);
                setDeleteDialog({ isOpen: false, itemId: null });
                toast.success('Content deleted successfully');
            }, 500);
        }
    };

    const handleCancelDelete = () => {
        setDeleteDialog({ isOpen: false, itemId: null });
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <LoadingSpinner size="lg" text="Processing..." />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Content Management</h1>
                    <p className="mt-1 text-sm text-gray-500">
                        Create, edit, and manage your content
                    </p>
                </div>
                <button className="btn-primary">
                    ➕ New Content
                </button>
            </div>

            {/* Search and Filter */}
            <div className="bg-white rounded-lg shadow-sm p-4">
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Search content..."
                        className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>All Status</option>
                        <option>Published</option>
                        <option>Draft</option>
                    </select>
                    <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500">
                        <option>All Authors</option>
                    </select>
                </div>
            </div>

            {/* Content List */}
            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Title
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Author
                            </th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Last Modified
                            </th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions
                            </th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {contentItems.map((item) => (
                            <tr key={item.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <div className="text-sm font-medium text-gray-900">{item.title}</div>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                        item.status === 'published' 
                                            ? 'bg-green-100 text-green-800' 
                                            : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                        {item.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                    {item.author}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <Tooltip content={formatDateTime(item.lastModified)}>
                                        <span className="text-sm text-gray-500">
                                            {formatFriendlyDate(item.lastModified)}
                                        </span>
                                    </Tooltip>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    <Tooltip content="Edit content">
                                        <button 
                                            onClick={() => handleEdit(item.id)}
                                            className="text-primary-600 hover:text-primary-900 mr-3"
                                        >
                                            Edit
                                        </button>
                                    </Tooltip>
                                    {item.status === 'draft' && (
                                        <Tooltip content="Publish to make it live">
                                            <button 
                                                onClick={() => handlePublish(item.id)}
                                                className="text-green-600 hover:text-green-900 mr-3"
                                            >
                                                Publish
                                            </button>
                                        </Tooltip>
                                    )}
                                    <Tooltip content="Delete permanently">
                                        <button 
                                            onClick={() => confirmDelete(item.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </Tooltip>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Confirmation Dialog */}
            <ConfirmDialog
                isOpen={deleteDialog.isOpen}
                title="Delete Content"
                message="Are you sure you want to delete this content? This action cannot be undone."
                confirmText="Delete"
                cancelText="Cancel"
                type="danger"
                onConfirm={handleDelete}
                onCancel={handleCancelDelete}
            />
        </div>
    );
};

export default Content;