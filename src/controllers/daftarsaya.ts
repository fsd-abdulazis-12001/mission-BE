import { prismaClient } from './../index';
import { NextFunction, Request, Response } from 'express';
import { NotFoundException } from '../exceptions/not-found';
import { BadRequestException } from '../exceptions/bad-request';
import { RequestCustom } from '../interfaces/request-custom';
import { ErrorCode } from '../exceptions/root';

export const addToDaftarSaya = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { title, image, neweps, top10 } = req.body;

    if (!title || !image) {
        throw new BadRequestException("Missing required fields: title or image", ErrorCode.MISSING_REQUIRED_FIELDS);
    }

    const existingItem = await prismaClient.daftarSaya.findFirst({
        where: {
            title,
            userId: req.user?.id,
        },
    });

    if (existingItem) {
        throw new BadRequestException("Item already exists in DaftarSaya", ErrorCode.ITEM_ALREADY_EXISTS);
    }

    // Create new entry in "DaftarSaya"
    const newItem = await prismaClient.daftarSaya.create({
        data: {
            title,
            image,
            neweps: neweps || false,
            top10: top10 || false,
            userId: req.user?.id as number,
        },
    });

    res.status(201).json(newItem);
};

// Remove a movie/series from "DaftarSaya"
export const removeFromDaftarSaya = async (req: RequestCustom, res: Response, next: NextFunction) => {
    const { daftarSayaId } = req.params;

    if (!daftarSayaId) {
        throw new BadRequestException("Missing required field: daftarSayaId", ErrorCode.MISSING_REQUIRED_FIELDS);
    }

    // Check if the item exists in "DaftarSaya"
    const existingItem = await prismaClient.daftarSaya.findUnique({
        where: {
            id: parseInt(daftarSayaId),
        },
    });

    if (!existingItem || existingItem.userId !== req.user?.id) {
        throw new NotFoundException("Item not found in DaftarSaya or unauthorized", ErrorCode.ITEM_NOT_FOUND);
    }

    // Delete the item from "DaftarSaya"
    await prismaClient.daftarSaya.delete({
        where: { id: parseInt(daftarSayaId) },
    });

    res.status(200).json({ message: 'Item successfully removed from DaftarSaya' });
};

export const getDaftarSaya = async (req: RequestCustom, res: Response, next: NextFunction) => {
    if (!req.user || !req.user.id) {
        throw new NotFoundException("User not found", ErrorCode.USER_NOT_FOUND);
    }

    // Fetch all items in "DaftarSaya" for the logged-in user
    const daftarSayaList = await prismaClient.daftarSaya.findMany({
        where: {
            userId: req.user.id, // Filter by the authenticated user's ID
        },
        include: {
            user: true, // Optionally include the related user data
        },
    });

    // If no items are found, return an empty array
    if (!daftarSayaList || daftarSayaList.length === 0) {
        return res.status(200).json([]);
    }

    // Return the list of items in "DaftarSaya"
    res.status(200).json(daftarSayaList);
};