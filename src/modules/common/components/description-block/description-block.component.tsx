import React from 'react'

type DescriptionBlockProps = {
    block: {
        children: { text: string }[]
    }
    className?: string
}

const DescriptionBlock: React.FC<DescriptionBlockProps> = ({
    block,
    className,
}) => {
    return (
        <div
            className={className}
            dangerouslySetInnerHTML={{
                __html: block.children.map((child) => child.text).join(' '),
            }}
        />
    )
}

export default DescriptionBlock
