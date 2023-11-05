/**
 * @file files.js
 * @summary Defines file schema
 * */

import { Schema, model } from 'mongoose';

const fileSchema = new Schema({
    fileId: {
        type: String,
        unique: true,
        trim: true,
        required: true,
    },
    size: {
        type: Number,
        trim: true,
        required: true,
    },
    name: {
        type: String,
        trim: true,
        required: true,
    }
},
    {
        timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' }
    }
);

export const Files = model('Files', fileSchema);
