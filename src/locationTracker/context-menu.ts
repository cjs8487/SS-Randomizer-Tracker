import { ShowContextMenuParams, UseContextMenuParams, useContextMenu as contexifyUseContextMenu } from "react-contexify";

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;

// The contexify library has a typing bug making type checking weaker than it could be
export function useContextMenu<TProps>(params: UseContextMenuParams<TProps>): {
    show: (params: MakeOptional<ShowContextMenuParams<TProps>, 'id'>) => void;
    hideAll: () => void;
} {
    return contexifyUseContextMenu(params);
}