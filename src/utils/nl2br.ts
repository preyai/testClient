function nl2br(text: string): string {
    return text.replace(/\n/g, '<br>');
}

export default nl2br;