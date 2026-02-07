import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

import {
  Container,
  Content,
  FormGroup,
  FormLabel,
  Header,
  Input,
  PageTitle,
  SaveButton,
  Select,
  Textarea,
} from './CreateQuiz.styles';

const CreateQuiz = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    passingScore: 70,
    status: 'Draft',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // API call will be added here
    // For now, using mock quiz ID
    const quizId = 1; // This will come from API response
    console.log('Quiz data:', formData);

    // Navigate to add questions page
    navigate(`/quiz/create/${quizId}/questions`);
  };

  return (
    <Container>
      <Header>
        <PageTitle>Ստեղծել նոր թեստ</PageTitle>
      </Header>

      <Content>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormLabel>
              Թեստի անվանում <span className="required">*</span>
            </FormLabel>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Մուտքագրեք թեստի անվանումը"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>
              Կատեգորիա <span className="required">*</span>
            </FormLabel>
            <Select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              required
            >
              <option value="">Ընտրեք կատեգորիան</option>
              <option value="service">Սպասարկում</option>
              <option value="sales">Վաճառք</option>
              <option value="marketing">Մարքեթինգ</option>
              <option value="it">IT</option>
              <option value="hr">Մարդկային ռեսուրսներ</option>
              <option value="finance">Ֆինանսներ</option>
            </Select>
          </FormGroup>

          <FormGroup>
            <FormLabel>Նկարագրություն</FormLabel>
            <Textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Մուտքագրեք թեստի նկարագրությունը"
              rows={4}
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>
              Անցման միավոր (%) <span className="required">*</span>
            </FormLabel>
            <Input
              type="number"
              name="passingScore"
              value={formData.passingScore}
              onChange={handleInputChange}
              min="0"
              max="100"
              required
            />
          </FormGroup>

          <FormGroup>
            <FormLabel>
              Կարգավիճակ <span className="required">*</span>
            </FormLabel>
            <Select
              name="status"
              value={formData.status}
              onChange={handleInputChange}
              required
            >
              <option value="Draft">Սևագիր</option>
              <option value="Active">Ակտիվ</option>
              <option value="Disabled">Անջատված</option>
            </Select>
          </FormGroup>

          <SaveButton type="submit">Պահպանել թեստը</SaveButton>
        </form>
      </Content>
    </Container>
  );
};

export default CreateQuiz;
