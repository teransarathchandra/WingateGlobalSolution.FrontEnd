export const formatFileName = (typeName, id) => {
    const date = new Date();
    const dateString = date.toLocaleDateString('en-GB').replace(/\//g, '-');
    const timeString = date.toTimeString().split(' ')[0].replace(/:/g, '-');
    return `${typeName}_${id}_${dateString}_${timeString}.pdf`;
};