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

  const currentFilename = filenameInput.value.trim();

  const cleanName = toSnakeCaseFileName(currentFilename);
  const extension = getFileExtension(currentFilename);
  const uniqueId = createUniqueId();

  const newName = `${cleanName}_${uniqueId}${extension}`;

  updateFilenameInput(filenameInput, newName);
};

const updateFilenameInput = (input: HTMLInputElement, newName: string) => {
  const nativeSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;

  input.focus();

  nativeSetter?.call(input, newName);

  input.title = newName;
  input.setAttribute("title", newName);

  input.dispatchEvent(new InputEvent("input", { bubbles: true, inputType: "insertText" }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
  input.blur();
};

const getFileExtension = (fileName: string) => {
  const match = fileName.match(/\.[^/.]+$/);

  return match?.[0]?.toLowerCase() ?? "";
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
