
interface ListItem {
	id: string
	title?: string
	body: string
	creationTime: number | string
}

let listItems: ListItem[] = [];

export default {

    ListItems: (args: {newerThan: string, olderThan: string, titleContains: string}): ListItem[] => {
        let items = listItems.filter( (item: ListItem) => {
            return (
                (!args.titleContains || (item.title && item.title.indexOf(args.titleContains) >= 0)) &&
                (!args.olderThan || (new Date(item.creationTime) > new Date(parseInt(args.olderThan)))) &&
                (!args.newerThan || (new Date(item.creationTime) < new Date(parseInt(args.newerThan))))
            );
        }).map( (item: ListItem) => {
            item.creationTime = new Date(item.creationTime).toDateString();
            return item;
        });
        return items;
    },

    ListItem: (args: any): (ListItem | undefined) => {
        let item = listItems.find( item => item.id == args.id );
        if(item)
            item.creationTime = new Date(item.creationTime).toDateString();
        return item
    },




	CreateListItem: (args: any): ListItem => {
        let item: ListItem = args.item;
        item.id = Math.random().toString();
        item.creationTime = new Date().getTime();
        listItems.push(item);
        item.creationTime = new Date(item.creationTime).toDateString();
        return item;
    },

	DeleteListItem: (args: any): boolean => {
        let index = listItems.findIndex( item => item.id == args.id );
        if(!index){
            return false;
        }
        listItems.splice(index, 1);
        return true;
    },

}