function FadingLine({ via }: { via: string }) {
  return (
    <div
      className={`w-full h-0.5 bg-gradient-to-r from-transparent ${via} to-transparent`}
    />
  );
}

export default FadingLine;
