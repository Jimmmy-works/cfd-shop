import useMutation from "@/hooks/useMutation";
import useQuery from "@/hooks/useQuery";
import { homeService } from "@/service/homeService";
import { subscribeService } from "@/service/subscribeService";
import { message } from "antd";
import { useForm } from "react-hook-form";
const useContact = () => {
  const formContact = useForm();
  const { data, loading, error } = useQuery(() =>
    homeService.getPage("service")
  );
  const { execute: executeContact } = useMutation(
    subscribeService.subscribeContact,
    {
      onSuccess: () => {
        message.success(`Gửi đăng kí thành công`);
      },
      onFail: () => {
        message.error(`Gửi đăng kí thất bại, xin vui lòng thử lại`);
      },
    }
  );
  return { formContact, dataContact: data, executeContact };
};
export default useContact;
