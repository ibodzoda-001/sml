import ListType from "./ListType";
import Lists from "./Lists";
import {useSelector} from "react-redux";
import ListLoading from "./ListLoading";
import {Empty} from "antd";

function AdsList({listOfAds, listLoading, purpose}) {
    const listType = useSelector((state) => {
        return state.adsListType;
    })
    return (
        <div>
            <ListType listType={listType} />
            {
                listLoading
                    ? <ListLoading/>
                    : <div>
                        {listOfAds.length !== 0 ? <Lists ads={listOfAds} listType={listType} purpose={purpose}/> : <Empty
                            style={{padding: '20vh', margin: '0px', marginTop: '15px', border: '1px solid whitesmoke'}}/>}
                    </div>
            }
        </div>
    )
}

export default AdsList;