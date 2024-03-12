import { useEffect } from "react";

const useDevEffect = (cb: any, _: any, deps: any[]) => {
	let ran = false;
	useEffect(() => {
		if (ran) return;
		cb();
		return () => {
			ran = true;
			// onUnMount();
			console.log("return ran");
		};
	}, deps);
};

const isDev = !process.env.NODE_ENV || process.env.NODE_ENV === "development";

export const useOnceEffect = isDev ? useDevEffect : useEffect;
