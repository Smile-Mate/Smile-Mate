export const copyToClipboardWeb = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log('Copied to clipboard: ', text);
  } catch (error) {
    console.error(error);
  }
};
