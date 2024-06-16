/** @jsxImportSource @emotion/react */
"use client"

import { css } from '@emotion/react'

import TextField from '@mui/material/TextField';
import { Button } from '@/components/Button';
import { BlumeDisplay } from '@/components/BlumeDisplay';
import { useState } from 'react';

const encode = css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 64px;
`

const encodeParameter = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-left: 32px;

  & *{
    margin-top: 16px;
  }
`

export const Encoder = () => {

    const [text, setText] = useState<string>("")
    console.log(text)

    const handleClick = async () => {
        console.log("Bloom!")

        const response = await fetch('http://localhost:8080/encode', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "data": text
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    }

    const changeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        setText(event.target.value)
    }

    return (        
        <div css={encode}>
            <BlumeDisplay picture={undefined} onDrop={() => {}}/>
            <div css={encodeParameter}>
            <TextField id="outlined-basic" label="Enter text" variant="outlined" fullWidth value={text} onChange={changeHandler} />
            <Button text="Bloom!" onClick={handleClick} />
            </div>
        </div>
    )
}