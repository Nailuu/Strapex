
interface HeaderParagraphProps {
    title: string;
    text: string;
}

const HeaderParagraph = ({ title, text }: Readonly<HeaderParagraphProps>) => {
    return (
        <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold">{title}</h3>
            <p>{text}</p>
        </div>
    )
}

export default HeaderParagraph