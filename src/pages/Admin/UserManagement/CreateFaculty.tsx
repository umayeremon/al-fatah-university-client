import { Button, Col, Divider, Form, Input, Row } from "antd";
import { Controller, FieldValues, SubmitHandler } from "react-hook-form";
import AFForm from "../../../Form/AFForm";
import AFInput from "../../../Form/AFInput";
import AFSelect from "../../../Form/AFSelect";
import { genderOptions } from "../../../constants/global";
import AFDatePicker from "../../../Form/AFDatePicker";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/Admin/AcademicManagementApi";
import { useAddFacultyMutation } from "../../../redux/features/Admin/UserManagementApi";
import { toast } from "sonner";
import { facultyDesignationOptions } from "../../../constants/faculty";
import { TRes } from "../../../types";

const CreateFaculty = () => {
  const { data: dData, isLoading: dIsLoading } =
    useGetAllAcademicDepartmentQuery(undefined);
  const departmentOptions = dData?.data?.map(
    (item: { _id: string; name: string }) => ({
      value: item._id,
      label: item.name,
    })
  );
  const [addFaculty] = useAddFacultyMutation();
  const onsubmit: SubmitHandler<FieldValues> = async (data) => {
    // console.log(data);
    try {
      const facultyData = {
        password: "faculty123",
        faculty: data,
      };
      const formData = new FormData();
      formData.append("data", JSON.stringify(facultyData));
      formData.append("file", data.profileImg);
      const res: TRes = await addFaculty(formData);
      if (res.error) {
        toast.error(res?.error?.data?.errorSources[0]?.message);
      } else {
        toast.success(res.data.message);
      }
      console.log(Object.fromEntries(formData));
    } catch (err) {
      console.log("catch error", err);
    }
  };
  return (
    <Row>
      <Col span={24}>
        <AFForm onSubmit={onsubmit}>
          <Row gutter={8}>
            <Divider>Personal Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="First Name" name="name.firstName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Middle Name" name="name.middleName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Last Name" name="name.lastName" type="text" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect label="Gender" name="gender" options={genderOptions} />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFDatePicker label="Date Of Birth" name="dateOfBirth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <Controller
                name="profileImg"
                render={({ field: { onChange, value, ...field } }) => (
                  <Form.Item label="Profile Image">
                    <Input
                      type="file"
                      value={value?.fileName}
                      {...field}
                      onChange={(e) => onChange(e.target.files?.[0])}
                    />
                  </Form.Item>
                )}
              />
            </Col>
            <Divider>Contact Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Email" name="email" type="email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput label="Contact Number" name="contactNo" type="Number" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Emergency Contact Number"
                name="emergencyContactNo"
                type="Number"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Present Address"
                name="presentAddress"
                type="address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFInput
                label="Permanent Address"
                name="permanentAddress"
                type="address"
              />
            </Col>
            <Divider>Academic Info</Divider>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect
                label="Designation"
                name="designation"
                options={facultyDesignationOptions}
                disabled={dIsLoading}
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <AFSelect
                label="Academic Department"
                name="academicDepartment"
                options={departmentOptions}
                disabled={dIsLoading}
              />
            </Col>
          </Row>
          <div
            style={{
              textAlign: "center",
            }}>
            <Button htmlType="submit" size="large">
              Submit
            </Button>
          </div>
        </AFForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
