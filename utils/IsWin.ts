export const IsWin = process.platform === "win32";

export function IfWin<IValue>(winValue: IValue, otherValue: IValue): IValue {
	return IsWin ? winValue : otherValue;
}
