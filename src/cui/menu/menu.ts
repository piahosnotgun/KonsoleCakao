export abstract class Menu {
	protected text: string;
	public abstract onSelect();
	public getText(){
		return this.text;
	}
}