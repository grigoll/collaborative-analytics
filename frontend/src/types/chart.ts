export type ChartDataCountry = 'FR' | 'GB' | 'BE' | 'DE' | 'ES' | 'IT';

export enum ChartDataFeature {
	Hotdog = 'hotdog',
	Burger = 'burger',
	Sandwich = 'sandwich',
	Kebab = 'kebab',
	Fries = 'fries',
	Donut = 'donut',
}

export type ChartDataPointKey = `${ChartDataCountry}:${ChartDataFeature}`;

export type ChartDataPoint = {
	feature: ChartDataFeature;
	country: ChartDataCountry;
};

export type ChartDataItem = {
	country: ChartDataCountry;
} & {
	[key in ChartDataFeature]: number;
};

export type ChartCommentThread = {
	id: string;
	commentsCount: number;
	chartDataPoint: ChartDataPoint;
};

export type ChartComment = {
	userName: string;
	text: string;
};
