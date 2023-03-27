export type ChartDataFeature = 'hotdog' | 'burger' | 'sandwich' | 'kebab' | 'fries' | 'donut';

export type ChartDataCountry = 'FR' | 'GB' | 'BE' | 'DE' | 'ES' | 'IT';

export type ChartDataPoint = {
	feature: ChartDataFeature;
	country: ChartDataCountry;
};

export type ChartCommentThread = {
	id: string;
	comments_count: number;
	chart_data_point: ChartDataPoint[];
};

export type ChartComment = {
	user_name: string;
	text: string;
};
