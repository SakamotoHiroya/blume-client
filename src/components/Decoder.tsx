/** @jsxImportSource @emotion/react */
"use client"

import { css } from '@emotion/react'

import TextField from '@mui/material/TextField';
import { Button } from '@/components/Button';
import { BlumeDisplay } from '@/components/BlumeDisplay';
import { FileWithPath } from 'react-dropzone';
import { useState } from 'react';
import { Buffer } from 'buffer';

const decode = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 64px;
`

const decodeParameter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 32px;

  & *{
    margin-top: 16px;
  }
`

function convertImageToBitmapBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0);
            canvas.toBlob((blob) => {
              if (blob) {
                const reader = new FileReader();
                reader.onloadend = () => {
                  resolve(reader.result as string);
                };
                reader.onerror = reject;
                reader.readAsDataURL(blob);
              } else {
                reject(new Error('Canvas toBlob failed.'));
              }
            }, 'image/png'); // ビットマップとして扱うためにPNG形式を使用
          } else {
            reject(new Error('Failed to get 2D context.'));
          }
        };
        img.onerror = reject;
        img.src = reader.result as string;
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

export const Decoder = () => {

    const [file, setFile] = useState<FileWithPath>();
    const [decodedText, setDecodedText] = useState<string>("");

    const handleDrop = (files: FileWithPath[]) => {
        setFile(files[0]);
    }

    const handleClick = async () => {
        console.log("Decode!");

        const base64Image = convertImageToBitmapBase64(file as File)

        try {
            const response = await fetch('http://localhost:8080/decode', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "image": base64Image
                })
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setDecodedText(data.data)

        } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
        }
    }

    return (
        <div css={decode}>
            <BlumeDisplay picture={file} onDrop={handleDrop}/>
            <div css={decodeParameter}>
            <TextField value={decodedText} id="outlined-basic" variant="outlined" fullWidth InputProps={{readOnly: true}}/>
            <Button text="Decode!" onClick={handleClick} />
            </div>
        </div>
    )
}