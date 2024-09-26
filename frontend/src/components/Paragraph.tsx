
interface ParagraphProps {
    text: string;
}

const Paragraph = ({ text }: Readonly<ParagraphProps>) => {
    return (
        <p>{text}</p>
    )
}

export default Paragraph