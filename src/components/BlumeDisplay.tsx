/** @jsxImportSource @emotion/react */
"use client"

import { css } from '@emotion/react'
import { FileWithPath, useDropzone } from 'react-dropzone';
import Image from 'next/image'
const style = css`
    width: 400px;
    height: 400px;
    background-color: #fff;
    border-radius: 4px;
    box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
    
    display: flex;
    justify-content: center;
    align-items: center;
`

type Props = {
    picture: FileWithPath | undefined,
    onDrop: (files: File[]) => void,
}

export const BlumeDisplay = ({ picture, onDrop }: Props) => {
    const { getRootProps, getInputProps } = useDropzone({onDrop});

    return (
        <div css={style} {...getRootProps()}>
            <input {...getInputProps()} />
            {picture ? <Image src={URL.createObjectURL(picture)} alt="blume" width={300} height={300}/> : null}
        </div>
    )
}

