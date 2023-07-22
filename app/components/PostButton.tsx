type PostButtonProps = {
  label: string;
  postUrl: string;
  paramStr: string;
}

export const PostButton: React.FC<PostButtonProps> = ({ label, postUrl, paramStr }) => {
  return (
    <form action={postUrl} method="POST">
      <input type="hidden" name="appParams" value={paramStr} />
      <button
        className="px-4 py-2 m-2 border border-gray-200 rounded bg-blue-400 text-white"
        type="submit">
          {label}
        </button>
    </form>
  );
};