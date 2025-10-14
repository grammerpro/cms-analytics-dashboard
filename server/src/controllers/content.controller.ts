import { Request, Response } from 'express';
import ContentService from '../services/content.service';

class ContentController {
    async getAllContent(req: Request, res: Response): Promise<void> {
        try {
            const content = await ContentService.getAllContent();
            res.status(200).json(content);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error retrieving content';
            res.status(500).json({ message: 'Error retrieving content', error: errorMessage });
        }
    }

    async getContentById(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const content = await ContentService.getContentById(id);
            if (!content) {
                res.status(404).json({ message: 'Content not found' });
                return;
            }
            res.status(200).json(content);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error retrieving content';
            res.status(500).json({ message: 'Error retrieving content', error: errorMessage });
        }
    }

    async createContent(req: Request, res: Response): Promise<void> {
        try {
            const newContent = await ContentService.createContent(req.body);
            res.status(201).json(newContent);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error creating content';
            res.status(500).json({ message: 'Error creating content', error: errorMessage });
        }
    }

    async updateContent(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const updatedContent = await ContentService.updateContent(id, req.body);
            if (!updatedContent) {
                res.status(404).json({ message: 'Content not found' });
                return;
            }
            res.status(200).json(updatedContent);
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error updating content';
            res.status(500).json({ message: 'Error updating content', error: errorMessage });
        }
    }

    async deleteContent(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        try {
            const deleted = await ContentService.deleteContent(id);
            if (!deleted) {
                res.status(404).json({ message: 'Content not found' });
                return;
            }
            res.status(204).send();
        } catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Error deleting content';
            res.status(500).json({ message: 'Error deleting content', error: errorMessage });
        }
    }
}

export { ContentController };
export const contentController = new ContentController();
export default contentController;