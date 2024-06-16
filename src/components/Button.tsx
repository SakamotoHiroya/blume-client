/** @jsxImportSource @emotion/react */
"use client"

import { css } from '@emotion/react'

const style = css`
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 4px;
    cursor: pointer;
    padding: 16px 64px;
    color: #FFF;
    font-size: 16px;
    width: 100%;
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.1);

    &:hover {
        background-color: rgba(0, 0, 0, 0.7);
        box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.2);
    }
`

type Props = {
    text: string,
    onClick: () => void
}

export const Button = (props: Props) => {
    return <button onClick={props.onClick} css={style}>{props.text}</button>
}

