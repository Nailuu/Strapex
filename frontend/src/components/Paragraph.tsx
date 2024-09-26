
interface ParagraphProps {
    text: string;
}

const Paragraph = ({ text }: Readonly<ParagraphProps>) => {
    return (
        <p className="mx-8 md:mx-0">{text}</p>
    )
}

export default Paragraph