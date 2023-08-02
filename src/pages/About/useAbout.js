import useQuery from "@/hooks/useQuery";
import { homeService } from "@/service/homeService";

const useAbout = () => {
  const { data: dataAbout } = useQuery(() => homeService.getPage("about us"));
  return { dataAbout };
};
export default useAbout;
