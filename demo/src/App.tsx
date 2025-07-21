import { useState } from 'react';
import {
  Container,
  Title,
  Paper,
  Stack,
  Text,
  Code,
  Divider,
  Grid,
  Group,
  Button,
  Anchor,
  List,
  ThemeIcon,
  Box,
} from '@mantine/core';
import { IconBrandGithub, IconExternalLink } from '@tabler/icons-react';
import { DatePicker } from '@mehdiraized/dates';

function App() {
  const [singleDate, setSingleDate] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState<string[]>([]);

  return (
    <Box bg="#f8f9fa" style={{ minHeight: '100vh', direction: 'rtl' }}>
      <Box
        component="nav"
        bg="white"
        px="md"
        py="xs"
        style={{ borderBottom: '1px solid #e5e7eb', position: 'sticky', top: 0, zIndex: 50 }}
      >
        <Group position="apart">
          <Group>
            <Text fz={28}>📅</Text>
            <Text fw={700} fz={22}>
              @mehdiraized/dates
            </Text>
          </Group>
          <Group spacing={8}>
            <Anchor href="#features" fz={16} c="gray.7">
              ویژگی‌ها
            </Anchor>
            <Anchor href="#demo" fz={16} c="gray.7">
              دمو
            </Anchor>
            <Anchor href="#installation" fz={16} c="gray.7">
              نصب
            </Anchor>
            <Button
              component="a"
              href="https://github.com/mehdiraized/dates"
              target="_blank"
              leftIcon={<IconBrandGithub size={18} />}
              color="dark"
              size="xs"
            >
              GitHub
            </Button>
          </Group>
        </Group>
      </Box>

      <Box py={60} className="hero-gradient" style={{ color: 'white', textAlign: 'center' }}>
        <Title order={1} fz={48} mb={16}>
          Persian Date Picker
        </Title>
        <Text fz={22} mb={32} c="gray.2">
          یک کامپوننت زیبا و کاربردی برای انتخاب تاریخ شمسی در React با پشتیبانی کامل از Mantine UI
        </Text>
        <Group position="center" spacing={16}>
          <Button component="a" href="#installation" color="white" c="dark" size="md">
            شروع کنید
          </Button>
          <Button component="a" href="#demo" variant="outline" color="white" size="md">
            مشاهده دمو
          </Button>
        </Group>
      </Box>

      <Container id="features" py={60}>
        <Title order={2} align="center" mb={24}>
          ویژگی‌های کلیدی
        </Title>
        <Text align="center" mb={40} c="gray.7">
          تمام آنچه برای ایجاد تجربه کاربری عالی در انتخاب تاریخ نیاز دارید
        </Text>
        <Grid gutter={32}>
          <Grid.Col xs={12} sm={6} md={4}>
            <Paper withBorder p="lg" radius="md" className="feature-card">
              <Text fz={32} mb={8}>
                🗓️
              </Text>
              <Title order={4} mb={8}>
                تقویم شمسی
              </Title>
              <Text c="gray.7">پشتیبانی کامل از تقویم شمسی (جلالی) با محاسبات دقیق</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4}>
            <Paper withBorder p="lg" radius="md" className="feature-card">
              <Text fz={32} mb={8}>
                📅
              </Text>
              <Title order={4} mb={8}>
                انتخاب محدوده
              </Title>
              <Text c="gray.7">امکان انتخاب تاریخ تکی یا محدوده تاریخ با رابط کاربری زیبا</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4}>
            <Paper withBorder p="lg" radius="md" className="feature-card">
              <Text fz={32} mb={8}>
                🎨
              </Text>
              <Title order={4} mb={8}>
                قابل سفارشی
              </Title>
              <Text c="gray.7">سفارشی‌سازی کامل با Tailwind CSS و پشتیبانی از تم‌های مختلف</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4}>
            <Paper withBorder p="lg" radius="md" className="feature-card">
              <Text fz={32} mb={8}>
                ⚡
              </Text>
              <Title order={4} mb={8}>
                عملکرد بالا
              </Title>
              <Text c="gray.7">بهینه‌سازی شده برای عملکرد سریع و تجربه کاربری روان</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4}>
            <Paper withBorder p="lg" radius="md" className="feature-card">
              <Text fz={32} mb={8}>
                📱
              </Text>
              <Title order={4} mb={8}>
                واکنش‌گرا
              </Title>
              <Text c="gray.7">طراحی واکنش‌گرا که در تمام دستگاه‌ها به خوبی کار می‌کند</Text>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} sm={6} md={4}>
            <Paper withBorder p="lg" radius="md" className="feature-card">
              <Text fz={32} mb={8}>
                🔧
              </Text>
              <Title order={4} mb={8}>
                TypeScript
              </Title>
              <Text c="gray.7">پشتیبانی کامل از TypeScript با type definitions دقیق</Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      <Container id="demo" py={60}>
        <Title order={2} align="center" mb={24}>
          دمو زنده
        </Title>
        <Text align="center" mb={40} c="gray.7">
          نحوه کارکرد کامپوننت را مشاهده کنید
        </Text>
        <Grid gutter={32}>
          <Grid.Col xs={12} md={6}>
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb={12}>
                انتخاب تاریخ تکی
              </Title>
              <DatePicker
                value={singleDate}
                onChange={(date) =>
                  setSingleDate(typeof date === 'string' ? date : (date && date[0]) || null)
                }
                placeholder="تاریخ مورد نظر را انتخاب کنید"
                label="تاریخ تولد"
                size="md"
              />
              <Text size="sm" c="dimmed" mt="xs">
                تاریخ انتخاب شده: <Code>{singleDate || 'هیچ تاریخی انتخاب نشده'}</Code>
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb={12}>
                انتخاب محدوده تاریخ
              </Title>
              <DatePicker
                type="range"
                value={dateRange}
                onChange={(date) => setDateRange(Array.isArray(date) ? date : date ? [date] : [])}
                placeholder="محدوده تاریخ انتخاب کنید"
                label="محدوده سفر"
                size="md"
              />
              <Text size="sm" c="dimmed" mt="xs">
                محدوده انتخاب شده:{' '}
                <Code>
                  {dateRange.length > 0
                    ? `${dateRange[0]} تا ${dateRange[1]}`
                    : 'هیچ محدوده‌ای انتخاب نشده'}
                </Code>
              </Text>
            </Paper>
          </Grid.Col>
        </Grid>
        <Divider my={32} />
        <Grid gutter={32}>
          <Grid.Col xs={12} md={4}>
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb={12}>
                اندازه‌های مختلف
              </Title>
              <Stack spacing="md">
                <DatePicker value={null} onChange={() => {}} placeholder="اندازه کوچک" size="xs" />
                <DatePicker value={null} onChange={() => {}} placeholder="اندازه متوسط" size="md" />
                <DatePicker value={null} onChange={() => {}} placeholder="اندازه بزرگ" size="lg" />
              </Stack>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} md={4}>
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb={12}>
                حالت غیرفعال
              </Title>
              <DatePicker
                value={null}
                onChange={() => {}}
                placeholder="غیرفعال"
                disabled
                label="تاریخ غیرفعال"
              />
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} md={4}>
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb={12}>
                با محدودیت تاریخ
              </Title>
              <DatePicker
                value={null}
                onChange={() => {}}
                placeholder="حداکثر تا امروز"
                label="تاریخ گذشته"
                maxDate={new Date().toISOString().split('T')[0]}
              />
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      <Container id="installation" py={60}>
        <Title order={2} align="center" mb={24}>
          نصب و راه‌اندازی
        </Title>
        <Text align="center" mb={40} c="gray.7">
          در چند مرحله ساده کامپوننت را به پروژه خود اضافه کنید
        </Text>
        <Grid gutter={32}>
          <Grid.Col xs={12} md={6}>
            <Title order={4} mb={12}>
              1. نصب پکیج
            </Title>
            <Paper
              withBorder
              p="md"
              radius="md"
              className="code-block"
              style={{ background: '#1a1a1a' }}
            >
              <Text color="green.4">$</Text>{' '}
              <Text color="blue.4" span>
                npm install
              </Text>{' '}
              <Text color="yellow.4" span>
                @mehdiraized/dates
              </Text>
            </Paper>
            <Title order={4} mb={12}>
              2. نصب وابستگی‌ها
            </Title>
            <Paper
              withBorder
              p="md"
              radius="md"
              className="code-block"
              style={{ background: '#1a1a1a' }}
            >
              <Text color="green.4">$</Text>{' '}
              <Text color="blue.4" span>
                npm install
              </Text>{' '}
              <Text color="yellow.4" span>
                react react-dom @mantine/core @tabler/icons-react dayjs
              </Text>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Title order={4} mb={12}>
              3. استفاده در کد
            </Title>
            <Paper
              withBorder
              p="md"
              radius="md"
              className="code-block"
              style={{ background: '#1a1a1a' }}
            >
              <Text color="purple.4" span>
                import
              </Text>{' '}
              <Text span>{'{'}</Text>
              <Text color="blue.4" span>
                DatePicker
              </Text>
              <Text span>{'}'}</Text>{' '}
              <Text color="purple.4" span>
                from
              </Text>{' '}
              <Text color="green.4" span>
                '@mehdiraized/dates'
              </Text>
              <Text span>;</Text>
              <br />
              <Text color="purple.4" span>
                function
              </Text>{' '}
              <Text color="blue.4" span>
                App
              </Text>
              <Text span>() {'{'}</Text>
              <Text color="purple.4" span>
                const
              </Text>{' '}
              <Text span>[date, setDate] =</Text>{' '}
              <Text color="blue.4" span>
                useState
              </Text>
              <Text span>(</Text>
              <Text color="orange.4" span>
                null
              </Text>
              <Text span>);</Text>
              <br />
              <Text color="purple.4" span>
                return
              </Text>
              <Text span>(</Text>
              <Text color="blue.4" span>
                &lt;DatePicker
              </Text>
              <Text span>value=&#123;date&#125;</Text>
              <Text span>onChange=&#123;setDate&#125;</Text>
              <Text span>/&gt;</Text>
              <Text span>);</Text>
              <Text span>&#125;</Text>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      <Container py={60}>
        <Title order={2} align="center" mb={24}>
          مثال‌های کاربردی
        </Title>
        <Text align="center" mb={40} c="gray.7">
          نمونه‌های مختلف استفاده از کامپوننت
        </Text>
        <Grid gutter={32}>
          <Grid.Col xs={12} md={6}>
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb={12}>
                انتخاب محدوده تاریخ
              </Title>
              <Paper
                withBorder
                p="md"
                radius="md"
                className="code-block"
                style={{ background: '#1a1a1a' }}
              >
                <Text color="purple.4" span>
                  const
                </Text>{' '}
                <Text span>[dateRange, setDateRange] =</Text>{' '}
                <Text color="blue.4" span>
                  useState
                </Text>
                <Text span>([]);</Text>
                <br />
                <Text color="blue.4" span>
                  &lt;DatePicker
                </Text>
                <Text span>type="range"</Text>
                <Text span>value=&#123;dateRange&#125;</Text>
                <Text span>onChange=&#123;setDateRange&#125;</Text>
                <Text span>/&gt;</Text>
              </Paper>
            </Paper>
          </Grid.Col>
          <Grid.Col xs={12} md={6}>
            <Paper withBorder p="lg" radius="md">
              <Title order={4} mb={12}>
                سفارشی‌سازی استایل
              </Title>
              <Paper
                withBorder
                p="md"
                radius="md"
                className="code-block"
                style={{ background: '#1a1a1a' }}
              >
                <Text color="blue.4" span>
                  &lt;DatePicker
                </Text>
                <Text span>size="lg"</Text>
                <Text span>classNames=&#123;&#123;</Text>
                <Text span>day: 'my-custom-day',</Text>
                <Text span>selectedDay: 'my-custom-selected'</Text>
                <Text span>&#125;&#125;</Text>
                <Text span>/&gt;</Text>
              </Paper>
            </Paper>
          </Grid.Col>
        </Grid>
      </Container>

      <Box component="footer" bg="dark.9" c="white" py={40} mt={40}>
        <Container>
          <Grid gutter={32}>
            <Grid.Col xs={12} md={4}>
              <Title order={4} mb={12}>
                @mehdiraized/dates
              </Title>
              <Text c="gray.4">یک کامپوننت زیبا و کاربردی برای انتخاب تاریخ شمسی در React</Text>
            </Grid.Col>
            <Grid.Col xs={12} md={4}>
              <Title order={4} mb={12}>
                لینک‌های مفید
              </Title>
              <List spacing="xs" c="gray.4">
                <List.Item
                  icon={
                    <ThemeIcon color="gray" size={20} radius="xl">
                      <IconExternalLink size={14} />
                    </ThemeIcon>
                  }
                >
                  <Anchor
                    href="https://www.npmjs.com/package/@mehdiraized/dates"
                    target="_blank"
                    c="white"
                  >
                    NPM Package
                  </Anchor>
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="gray" size={20} radius="xl">
                      <IconBrandGithub size={14} />
                    </ThemeIcon>
                  }
                >
                  <Anchor href="https://github.com/mehdiraized/dates" target="_blank" c="white">
                    GitHub Repository
                  </Anchor>
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="gray" size={20} radius="xl">
                      <IconExternalLink size={14} />
                    </ThemeIcon>
                  }
                >
                  <Anchor href="https://mantine.dev" target="_blank" c="white">
                    Mantine UI
                  </Anchor>
                </List.Item>
              </List>
            </Grid.Col>
            <Grid.Col xs={12} md={4}>
              <Title order={4} mb={12}>
                پشتیبانی
              </Title>
              <List spacing="xs" c="gray.4">
                <List.Item
                  icon={
                    <ThemeIcon color="gray" size={20} radius="xl">
                      <IconExternalLink size={14} />
                    </ThemeIcon>
                  }
                >
                  <Anchor
                    href="https://github.com/mehdiraized/dates/issues"
                    target="_blank"
                    c="white"
                  >
                    گزارش مشکل
                  </Anchor>
                </List.Item>
                <List.Item
                  icon={
                    <ThemeIcon color="gray" size={20} radius="xl">
                      <IconExternalLink size={14} />
                    </ThemeIcon>
                  }
                >
                  <Anchor
                    href="https://github.com/mehdiraized/dates/discussions"
                    target="_blank"
                    c="white"
                  >
                    بحث و گفتگو
                  </Anchor>
                </List.Item>
              </List>
            </Grid.Col>
          </Grid>
          <Divider my={32} color="gray.8" />
          <Text align="center" c="gray.4">
            &copy; 2024 Mehdi Rezaei. تمامی حقوق محفوظ است.
          </Text>
        </Container>
      </Box>
    </Box>
  );
}

export default App;
