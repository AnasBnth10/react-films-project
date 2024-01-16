import CustomSkeleton from "../../common/skeleton/CustomSkeleton";
import PopularMoviesCarousel from "../carousel/PopularMoviesCarousel";
import { Movie } from "../models/movie-model";


interface IProps {
  movies: Movie[],
  error: boolean
  isLoading: boolean,
  isFavoriteFilmsPage: boolean
 
}

const CarouselErrorComponent: React.FC<IProps> = ({
movies,
error,
isLoading,
isFavoriteFilmsPage

}) => {
    
    return (
        
        <div>
        {error && <div>Error</div>}
                    {!error && (isLoading ? (
                                <CustomSkeleton width={1200} height={300} />
                            ) : (
                                <PopularMoviesCarousel
                                    isFavoriteFilmsPage={isFavoriteFilmsPage}
                                    movies={movies || []}
                                />
                            ))}  
                            </div>   
      
    )
}

export default CarouselErrorComponent;
