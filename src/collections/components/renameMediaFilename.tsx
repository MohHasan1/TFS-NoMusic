"use client";

export const renameMediaFilename = () => {
  return (
    <div style={{ paddingBottom: "12px" }}>
      <button
        type="button"
        onClick={renamePayloadFileInput}
        style={{
          cursor: "pointer",
        }}
      >
        Rename file
      </button>
    </div>
  );
};

const renamePayloadFileInput = () => {
  const filenameInput = document.querySelector<HTMLInputElement>("input.file-field__filename");
  if (!filenameInput?.value) return;

  const fileInput = document.querySelector<HTMLInputElement>("input[type='file']");

  const selectedFile = fileInput?.files?.[0];

  const isAudio =
    selectedFile?.type.startsWith("audio/") ||
    filenameInput.value.match(/\.(mp3|m4a|wav|aac|ogg)$/i);

  const cleanName = toSnakeCaseFileName(filenameInput.value);
  const uniqueId = createUniqueId();
  const transformedName = `${cleanName}_${uniqueId}`;

  const newName = isAudio
    ? `${transformedName}${getAudioExtension(filenameInput.value)}`
    : transformedName;

  filenameInput.value = newName;

  filenameInput.dispatchEvent(new Event("input", { bubbles: true }));
  filenameInput.dispatchEvent(new Event("change", { bubbles: true }));
};

const createUniqueId = () => crypto.randomUUID().slice(0, 8);
const toSnakeCaseFileName = (value: string) => {
  return value
    .replace(/\.[^/.]+$/, "")
    .replace(/([a-z])([A-Z])/g, "$1_$2")
    .replace(/[^a-zA-Z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "")
    .toLowerCase();
};
const getAudioExtension = (fileName: string) => {
  const extensionMatch = fileName.match(/\.(mp3|m4a|wav|aac|ogg)$/i);
  return extensionMatch?.[0]?.toLowerCase() ?? ".mp3";
};
