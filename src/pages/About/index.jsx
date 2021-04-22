import { Row, Col } from 'antd';

function AboutPage() {
  return (
    <div>
      <img
        src="https://bf5ylyhwc6obj.vcdn.cloud/templates/default/themes/news/images/main_tintuc.jpg"
        alt="img"
        style={{
          backgroundImage: 'url("https://bf5ylyhwc6obj.vcdn.cloud/templates/default/themes/news/images/main_tintuc.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
          width: '100%'
        }}
      />
      <Row>
        <Col  lg={0} xl={2}>
        </Col>
        <Col  lg={24} xl={20}>
          <p style={{ textAlign: 'center',paddingTop: '20px'}}>
            <strong>VFresh</strong>
            &nbsp;là hệ thống phát triển và&nbsp;
            phân phối thực phẩm hữu cơ được thành lập vào đầu năm 2013 với mục
            tiêu giúp người tiêu dùng Việt Nam có một cuộc sống khỏe mạnh hơn thông qua những loại thực&nbsp;
            phẩm hữu cơ có chứng nhận, thực phẩm tự nhiên và không có nguồn gốc biến đổi gene (GMO).
          </p>
          <h2 style = {{textAlign: 'center', fontSize : '200%'}}>
          Thực phẩm hữu cơ Organica có chứng nhận quốc tế, hoàn hảo cho sức khỏe của mẹ và bé cũng như gia đình bạn. 
          </h2>
          <p style={{ textAlign: 'center',paddingTop: '20px'}}>
            Vào năm 2015, sau nhiều nỗ lực tự phát triển và sản xuất,
            trang trại Organica tại Long Thành, Đồng Nai đã được cấp
            chứng nhận hữu cơ của Mỹ (USDA) và Liên minh châu Âu (EU),
            trở thành trang trại rau nhiệt đới hữu cơ đầu tiên ở Việt Nam.
            Tiếp nối sau đó, năm 2017 vườn Organica Ba Vì cũng đã được tổ chức
            Control Union đánh giá đạt tiêu chuẩn hữu cơ của Mỹ và châu Âu. Organica còn sử dụng
            Traceverified, dịch vụ truy xuất nguồn gốc điện tử duy nhất của Việt Nam,
            với mong muốn minh bạch thông tin và cam kết quá trình canh tác hữu
            cơ của mình với người tiêu dùng.
          </p>
        </Col>
        <Col  lg={0} xl={2}>
        </Col>
      </Row>,

    </div>

  )
}

export default AboutPage;