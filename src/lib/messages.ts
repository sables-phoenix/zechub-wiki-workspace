export type MessageTree = {
  [key: string]: string | MessageTree;
};

export type Messages = {
  source: MessageTree;
  ui: MessageTree;
};

export const lookup = (tree: MessageTree, key: string): string | undefined => {
  let cursor: string | MessageTree | undefined = tree;
  for (const part of key.split(".")) {
    if (!cursor || typeof cursor === "string") return undefined;
    cursor = cursor[part];
  }
  return typeof cursor === "string" ? cursor : undefined;
};

export type Translator = (key: string, fallback?: string) => string;

export const createTranslator = (
  messages: Messages,
  english: Messages,
  preferSource = false,
): Translator => {
  return (key, fallback) => {
    const primary = preferSource
      ? lookup(messages.source, key) ?? lookup(messages.ui, key)
      : lookup(messages.ui, key) ?? lookup(messages.source, key);
    return (
      primary ??
      lookup(english.ui, key) ??
      lookup(english.source, key) ??
      fallback ??
      key
    );
  };
};
