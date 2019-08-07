
interface ListItem {
	id: string
	title?: string
	body: string
    creationTime: number
    creationDate: string
}

let listItems: ListItem[] = [];

export default {

    ListItems: (args: {newerThan: string, olderThan: string, titleContains: string}): ListItem[] => {
        let items = listItems.filter( (item: ListItem) => {
            return (
                (!args.titleContains || (item.title && item.title.indexOf(args.titleContains) >= 0) ) &&
                (!args.olderThan || ( item.creationTime > parseInt(args.olderThan)) ) &&
                (!args.newerThan || ( item.creationTime < parseInt(args.newerThan)) )
            );
        });
        return items;
    },

    ListItem: (args: any): (ListItem | undefined) => {
        let item = listItems.find( item => item.id == args.id );
        return item
    },




	CreateListItem: (args: any): ListItem => {
        let item: ListItem = args.item;
        item.id = Math.random().toString();
        item.creationTime = new Date().getTime();
        item.creationDate = new Date(item.creationTime).toDateString();
        listItems.push(item);
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