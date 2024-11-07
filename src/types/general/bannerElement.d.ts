declare interface BannerElementI<ID = string> {
	title: string;
	content: string; // Markdown format
	button: ButtonI<ID>;
}
