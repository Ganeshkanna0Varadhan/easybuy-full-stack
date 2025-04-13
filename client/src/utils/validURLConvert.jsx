const validURLConvert = (name) => {
    // const url = name.toString().replaceAll(" ","-").replaceAll(",","-").replaceAll("&","-");
    const url = name.replace(/[^a-zA-Z0-9" "/"  "-]/gi,"").replace(/[" "]/g, "-");
    return url;
}

export default validURLConvert;