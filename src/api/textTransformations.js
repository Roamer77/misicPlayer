export const songNameRepresentation=(text,sliceLength)=>{
    if( text &&text.length>sliceLength){
        let firstLater=text[0].toUpperCase();
        let res=text.slice(1,sliceLength);
        return firstLater + res+'...';
    }
    return text;
};
