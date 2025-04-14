import React, { useEffect, useState } from "react";
import CardLoading from "../component/CardLoading";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from '../utils/Axios';
import { SummaryApi } from '../common/summaryApi';
import CardProduct from "../component/CardProduct";
import InfiniteScroll from "react-infinite-scroll-component";
import { useLocation } from "react-router-dom";
import noData  from '../assets/nothing here yet.webp'
const SearchPage = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const loadingArrayCard = new Array(20).fill(null);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const params = useLocation();
    const searchText = params?.search?.slice(3);
    const [debouncedSearch, setDebouncedSearch] = useState(searchText);

    const fetchData = async () => {
        try {
            if (!debouncedSearch) {
                setDebouncedSearch("");
            }
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.searchProduct,
                data: {
                    search: debouncedSearch ? debouncedSearch : "",
                    page: page
                }
            });

            // console.log(response.data.data);

            const responseData = response?.data;

            if (responseData?.success) {
                if (responseData.page === 1) {
                    setData(responseData.data);
                }
                else {
                    setData((prev) => {
                       return [
                        ...prev,
                        ...responseData.data
                       ] 
                    })
                }
                setTotalPage(responseData.totalPage);
            }
        }
        catch(err) {
            console.log(err);
            AxiosToastError(err);
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        const handler = setTimeout(() => {
          setDebouncedSearch(searchText);
        }, 500); // 500ms debounce
      
        return () => clearTimeout(handler);
      }, [searchText]);
      
    useEffect(() => {
        fetchData();
    }, [page, debouncedSearch]);

    const handleFetchMore = () => {
       if (totalPage > page) {
        setPage((prev) => prev + 1);
       } 
    }

    return (
        <section className="bg-white">  
            <div className="p-4">
                <p className="font-semibold">Search Results: {data?.length} </p>
                <InfiniteScroll 
                    dataLength={data?.length}
                    hasMore={true}
                    next={handleFetchMore}
                    >
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 py-4 gap-4">
                        {
                            data[0] && data.map((p, index) => {
                                return (
                                    <CardProduct data={p} key={"searchPage_product_"+index}/>
                                )
                            })
                        }

                        {
                            loading && (
                                loadingArrayCard.map((_, index) => {
                                    return (
                                        <CardLoading key={"searchpage-cardLoading-"+index}/>
                                    )
                                })
                            )

                        }
                    </div>
                </InfiniteScroll>

                {/* {
                    !data[0] && !loading && (
                        <div className="flex flex-col justify-center w-full mx-auto items-center">
                            <img 
                                src={noData}
                                className="w-full h-full max-w-xs max-h-xs block"
                            />
                            <p className="font-semibold my-2">No Data Found</p>
                        </div>
                    )
                } */}

            </div>
        </section>
    )
}

export default SearchPage;