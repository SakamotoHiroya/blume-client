/** @jsxImportSource @emotion/react */
"use client"

import { css } from '@emotion/react'

import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Container from '@mui/material/Container';

import { Encoder } from '@/components/Encoder';
import { Decoder } from '@/components/Decoder';
import React from 'react';

const main = css`
  box-sizing:border-box;
  padding: 128px 0;
  height: 100vh;
  background-image: linear-gradient(90deg, rgba(144, 245, 154, 1), rgba(4, 202, 255, 1));
  overflow: hidden;
`

const title = css`
  text-align: center;
  margin-bottom: 32px;
  font-size: 96px;
`

const row = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 32px 0;
`

export default function Home() {

  const [mode, setMode] = React.useState<string>('encode');

  const handleMode = (event: React.MouseEvent<HTMLElement>, newMode: string) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  }

  return (
    <main css={main}>
      <Container maxWidth="md">
        <h1 css={title}>Blume</h1>

        <div css={row}>
          <ToggleButtonGroup
            exclusive
            size="large"
            aria-label="Large sizes"
            onChange={handleMode}
            value={mode}>
            <ToggleButton value="encode">encode</ToggleButton>
            <ToggleButton value="decode">decode</ToggleButton>
          </ToggleButtonGroup>
        </div>

        {
          mode === 'encode' ? <Encoder /> : <Decoder />
        }
      </Container>
    </main>
  )
}