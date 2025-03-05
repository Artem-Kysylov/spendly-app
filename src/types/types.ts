export interface ButtonProps {
    text: string,
    onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void,
    className?: string,
}