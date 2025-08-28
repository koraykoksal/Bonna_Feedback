import React, { useState, useEffect } from 'react'
import { Box, Typography, FormControl, InputLabel, MenuItem, Select, Container, TextField, Button, Checkbox, FormControlLabel, CircularProgress, FormHelperText } from '@mui/material'
import { etiklik, location, department } from '../../helper/data';
import useFeedbackCall from '../../hooks/useFeedbackCall';
import { useSelector } from 'react-redux';

const Etiklik = ({ loading }) => {


  const now = new Date()

  // Gün, Ay ve Yıl için değerleri al
  const day = String(now.getDate()).padStart(2, '0'); // Günü 2 basamaklı yap
  const month = String(now.getMonth() + 1).padStart(2, '0'); // Ayı 2 basamaklı yap (0'dan başladığı için +1 ekliyoruz)
  const year = now.getFullYear();

  // Saat, Dakika ve Saniye için değerleri al
  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');

  // Düzenlenmiş tarih ve saati birleştir
  const formattedDate = `${day}-${month}-${year} ${hours}:${minutes}`;

  const { postFireData } = useFeedbackCall()

  const [bonnaUser, setBonnaUser] = useState(false)

  const [info, setInfo] = useState({
    name: "",
    surname: "",
    phone: "",
    email: "",
    topic: "Etiklik",
    title: "",
    subTitle: "",
    document: "",
    location: "",
    gorev: "",
    birim: "",
    actionType: "",
    actionResult: "",
    bonnaUser: bonnaUser ? 'Bonna Çalışanı' : 'Misafir',
    datetime: formattedDate
  })

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setInfo((prev) => ({ ...prev, title: newTitle, subTitle: '' })); // subTitle sıfırlanır
  };

  const handleSubTitleChange = (event) => {
    setInfo((prev) => ({ ...prev, subTitle: event.target.value }));
  };

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value })
  }

  const handleChangeFile = (e) => {
    const file = e.target.files[0]; // sadece ilk dosyayı al
    if (file) {
      setInfo((prev) => ({
        ...prev,
        document: file
      }));
    }
  }

  const selectedCategory = etiklik?.find(cat => cat?.title === info?.title);

  const handleSubmit = async (e) => {
    e.preventDefault()
    await postFireData('etiklik', info)
    setInfo({
      name: "",
      surname: "",
      phone: "",
      email: "",
      topic: "Etiklik",
      title: "",
      subTitle: "",
      document: "",
      location: "",
      gorev: "",
      birim: "",
      actionType: "",
      actionResult: "",
      bonnaUser: bonnaUser ? 'Bonna Çalışanı' : 'Misafir',
      datetime: formattedDate
    })
  }


  const handleIsCheck = (e) => {
    const { checked } = e.target
    checked ? setBonnaUser(true) : setBonnaUser(false)
  }


  return (
    <div>


      <Typography align='center' color='#FFB534' p={3} fontWeight={700} fontSize={22}>Etik</Typography>

      <Box sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        alignItems: 'flex-start',
        p: 2
      }}>
        <Typography variant='subtitle2' align='center' color={'error'}>
          Etik hattına yapılan tüm ihbarlar kesinlikle gizli tutulur. İhbara ilişkin bildirimler sadece İç Denetim Müdürü erişebilir. Başka bir çalışan, yönetici ve diğer 3. şahısların erişimine kapalıdır.
        </Typography>
        <Typography variant='subtitle2' align='center' color={'error'}>
          İhbarcı çalışan, verdiği bilgiler nedeniyle hiçbir şekilde misillemeye uğramaz (işten çıkarma, baskı, terfi engelleme vb.).
        </Typography>
        <Typography variant='subtitle2' align='center' color={'error'}>
          İhbar sırasında anonim olarak (isim vermeden) bildirim yapılabilir.
        </Typography>
        <Typography variant='subtitle2' align='center' color={'error'}>
          Şirket, etik ihbarda bulunan çalışanı korumak için gerekli tüm önlemleri alır ve misilleme durumlarında disiplin süreci başlatır.
        </Typography>
        <Typography variant='subtitle2' align='center' color={'error'}>
          Yanlış veya kasıtlı olarak iftira amaçlı ihbarlar da ayrıca değerlendirilir.
        </Typography>
      </Box>

      <Container maxWidth="sm" sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 3,
        p: 5,
      }}
        component={"form"}
        onSubmit={handleSubmit}
      >

        <FormControl fullWidth>
          <InputLabel id="title-select-label">Etik Kategori</InputLabel>
          <Select
            labelId="title-select-label"
            value={info.title}
            label="Etik Kategori"
            onChange={handleTitleChange}
            required
          >
            {etiklik?.map((cat) => (
              <MenuItem key={cat.title} value={cat.title}>
                {cat.title}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl fullWidth disabled={!info.title}>
          <InputLabel id="subtitle-select-label">Alt Başlık</InputLabel>
          <Select
            labelId="subtitle-select-label"
            value={info.subTitle}
            label="Alt Başlık"
            onChange={handleSubTitleChange}
            required
          >
            {selectedCategory?.items.map((item, idx) => (
              <MenuItem key={idx} value={item}>
                {item}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3 }}>
          <TextField
            fullWidth
            label='İsim'
            name='name'
            id='name'
            type='text'
            value={info.name}
            // inputProps={{
            //   maxLength: 50
            // }}
            onChange={handleChange}
            helperText="Opsiyonel"
          />
          <TextField
            fullWidth
            label='Soyisim'
            name='surname'
            id='surname'
            type='text'
            value={info.surname}
            // inputProps={{
            //   maxLength: 50
            // }}
            onChange={handleChange}
            helperText="Opsiyonel"
          />
          <TextField
            fullWidth
            label='Mail Adres'
            name='email'
            id='email'
            type='text'
            value={info.email}
            // inputProps={{
            //   maxLength: 50
            // }}
            onChange={handleChange}
            helperText="Opsiyonel"
          />
          <TextField
            fullWidth
            label='Telefon'
            name='phone'
            id='phone'
            type='text'
            value={info.phone}
            // inputProps={{
            //   maxLength: 50
            // }}
            onChange={handleChange}
            helperText="Opsiyonel"
          />
          <FormControl fullWidth>
            <InputLabel id="location">Lokasyon</InputLabel>
            <Select
              required
              labelId='location'
              name='location'
              id='location'
              label='location'
              value={info.location}
              onChange={handleChange}
            >
              {
                location?.map((item, index) => (
                  <MenuItem key={index} value={item}>{item}</MenuItem>
                ))
              }
            </Select>
            <FormHelperText>Opsiyonel</FormHelperText>
          </FormControl>



          <Box width={'100%'}>
            <FormControlLabel
              control={
                <Checkbox onChange={handleIsCheck} name="gilad" />
              }
              label="Bonna Çalışanı mısın ?"
            />
          </Box>

          {/* bonna çalışanı ise burayı göster */}
          {
            bonnaUser &&
            (
              <Box width={'100%'} sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 3, border: '1px solid #7487daed', borderRadius: 3, p: 2 }}>
                <TextField
                  fullWidth
                  label='Görev'
                  name='gorev'
                  id='gorev'
                  type='text'
                  value={info.gorev}
                  // inputProps={{
                  //   maxLength: 35
                  // }}
                  onChange={handleChange}
                  helperText="Opsiyonel"
                />
                <FormControl fullWidth>
                  <InputLabel id="birim">Departman</InputLabel>
                  <Select
                    required
                    labelId='birim'
                    name='birim'
                    id='birim'
                    label='birim'
                    value={info.birim}
                    onChange={handleChange}
                    MenuProps={{
                      PaperProps: {
                        style: {
                          maxHeight: 300,
                          overflow: 'auto'
                        }
                      }
                    }}
                  >
                    {
                      department?.map((item, index) => (
                        <MenuItem key={index} value={item.name}>{item.name}</MenuItem>
                      ))
                    }
                  </Select>
                  <FormHelperText>Opsiyonel</FormHelperText>
                </FormControl>
              </Box>
            )
          }


          <TextField
            fullWidth
            required
            multiline
            rows={4}
            label='Açıklama'
            name='detail'
            id='detail'
            type='text'
            value={info.detail}
            // inputProps={{
            //   maxLength: 50
            // }}
            onChange={handleChange}
          />
          <TextField
            fullWidth
            name='document'
            id='document'
            type='file'
            // inputProps={{
            //   maxLength: 50
            // }}
            onChange={handleChangeFile}
          />
        </Box>

        {
          loading ?
            <CircularProgress size={20} color="inherit" />
            :
            <Button disabled={loading} variant='contained' fullWidth type='submit'>Kayıt</Button>

        }
      </Container>


    </div>
  )
}

export default Etiklik