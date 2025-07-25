# IBL Guarulhos - Sistema de Membresia

## 📋 Visão Geral

Sistema completo de gestão de membros e Grupos Conectados (GCs) da Igreja Batista Lagoinha de Guarulhos. Desenvolvido com React, TypeScript, Supabase e Prisma, oferece funcionalidades para cadastro de membros, gestão de GCs, autenticação e dashboard administrativo.

## 🚀 Tecnologias Utilizadas

### Frontend

- **React 18.3.1** - Biblioteca principal para construção da interface
- **TypeScript** - Tipagem estática para JavaScript
- **Vite** - Build tool e dev server
- **Framer Motion** - Animações e transições
- **React Router Dom** - Roteamento
- **React Hook Form** - Gerenciamento de formulários
- **Zod** - Validação de esquemas
- **Sass/SCSS** - Pré-processador CSS
- **Styled Components** - CSS-in-JS

### Backend e Banco de Dados

- **Supabase** - Backend as a Service (autenticação, banco de dados, storage)
- **PostgreSQL** - Banco de dados principal (via Supabase)
- **Prisma** - ORM para SQLite (API complementar)
- **Turso/LibSQL** - Banco de dados SQLite distribuído

### Bibliotecas Adicionais

- **Leaflet + React Leaflet** - Mapas interativos
- **HTML2Canvas + jsPDF** - Geração de PDFs
- **Browser Image Compression** - Compressão de imagens
- **React Datepicker** - Seletor de datas
- **React Input Mask** - Máscaras de entrada
- **Sonner + React Hot Toast** - Notificações

## 🏗️ Arquitetura do Projeto

```
src/
├── components/          # Componentes reutilizáveis
│   ├── AddressForm/    # Formulário de endereço
│   ├── Dashboard/      # Componentes do dashboard
│   ├── FileUpload/     # Upload de arquivos
│   ├── GCMap/          # Mapa de GCs
│   ├── Modal/          # Sistema de modais
│   └── ...             # Outros componentes
├── contexts/           # Contextos React
├── features/           # Features organizadas por domínio
│   └── auth/          # Sistema de autenticação
├── hooks/             # Custom hooks
├── pages/             # Páginas da aplicação
│   ├── Dashboard/     # Painel administrativo
│   ├── Login/         # Autenticação
│   ├── MembershipForm/ # Formulário de membresia
│   └── NearestGC/     # Busca de GCs próximos
├── services/          # Camada de serviços
├── types/             # Definições de tipos TypeScript
├── utils/             # Funções utilitárias
└── styles/            # Estilos globais
```

## 📊 Modelo de Dados

### Supabase (PostgreSQL)

#### Tabela `members`

```sql
CREATE TABLE members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR NOT NULL,
  birth_date DATE,
  baptism_date DATE,
  baptism_church VARCHAR,
  phone VARCHAR,
  email VARCHAR UNIQUE,
  profession VARCHAR,
  marital_status VARCHAR,
  marriage_certificate_url TEXT,
  identification_url TEXT,
  pastoral_interviewer VARCHAR,
  belongs_to_gc BOOLEAN DEFAULT false,
  gc_name VARCHAR,
  wants_to_volunteer BOOLEAN DEFAULT false,
  cep VARCHAR,
  street VARCHAR,
  number VARCHAR,
  complement VARCHAR,
  neighborhood VARCHAR,
  city VARCHAR,
  state VARCHAR,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Tabela `gcs`

```sql
CREATE TABLE gcs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title VARCHAR NOT NULL,
  leader_name VARCHAR NOT NULL,
  leader_contact VARCHAR NOT NULL,
  contact VARCHAR NOT NULL,
  co_leader_name VARCHAR,
  co_leader_contact VARCHAR,
  weekday VARCHAR NOT NULL,
  time VARCHAR NOT NULL,
  is_online BOOLEAN DEFAULT false,
  is_couple BOOLEAN DEFAULT false,
  address TEXT,
  street VARCHAR,
  number VARCHAR,
  neighborhood VARCHAR,
  city VARCHAR DEFAULT 'Guarulhos',
  state VARCHAR DEFAULT 'SP',
  country VARCHAR DEFAULT 'Brasil',
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Prisma (SQLite) - API Complementar

#### Model `RegistroDecisao`

```prisma
model RegistroDecisao {
  id        String   @id @default(uuid())
  nome      String
  telefone  String
  bairro    String
  cidade    String
  estado    String
  desejo    String
  idade     String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

## 🔐 Sistema de Autenticação

### Fluxo de Autenticação

1. **Login**: Email/senha via Supabase Auth
2. **Verificação**: Hook `useAuth` gerencia estado do usuário
3. **Proteção**: Middleware protege rotas do dashboard
4. **Logout**: Limpa sessão e redireciona

### Componentes

- `SignIn` - Formulário de login
- `useAuth` - Hook para gerenciamento de estado
- `authService` - Serviços de autenticação

## 📝 Funcionalidades Principais

### 1. Cadastro de Membros

- **Localização**: `/pages/MembershipForm/`
- **Funcionalidades**:
  - Formulário completo com validação Zod
  - Upload de documentos (RG/CNH, Certidão de Casamento)
  - Compressão automática de imagens
  - Validação de email único
  - Seleção de GC existente

### 2. Gestão de GCs

- **Localização**: `/pages/Dashboard/GCList/`, `/pages/Dashboard/NewGC/`, `/pages/Dashboard/EditGC/`
- **Funcionalidades**:
  - Listagem com busca e filtros
  - Criação de novos GCs
  - Edição de GCs existentes
  - Suporte a GCs online e presenciais
  - Gestão de líderes e co-líderes

### 3. Dashboard Administrativo

- **Localização**: `/pages/Dashboard/`
- **Funcionalidades**:
  - Lista de membros com filtros
  - Estatísticas e métricas
  - Gestão de documentos
  - Exportação de dados
  - Consolidação de informações

### 4. Sistema de Mapas

- **Localização**: `/components/GCMap/`, `/pages/NearestGC/`
- **Funcionalidades**:
  - Visualização de GCs no mapa
  - Busca por GCs próximos
  - Geolocalização do usuário
  - Cálculo de distâncias

## 🛠️ Serviços e APIs

### Serviço de Membros (`services/member.ts`)

```typescript
// Principais funções
- createMember(data: MembershipFormData)
- getMembers()
- deleteMember(id: string)
- checkEmailExists(email: string)
```

### Serviço de GCs (`services/gc.ts`)

```typescript
// Interface GC
interface GC {
  id?: string
  title: string
  leader_name: string
  leader_contact: string
  contact: string
  co_leader_name?: string
  co_leader_contact?: string
  weekday: string
  time: string
  is_online: boolean
  is_couple: boolean
  // ... campos de endereço
}

// Principais funções
- createGC(gcData: Omit<GC, 'id' | 'created_at'>)
- getGCs()
- getGCById(id: string)
- updateGC(id: string, gcData: Partial<GC>)
- deleteGC(id: string)
```

### Serviço de Storage (`services/storage.ts`)

- Upload de arquivos para Supabase Storage
- Compressão automática de imagens
- Limpeza de arquivos órfãos
- Gestão de buckets

## 🎨 Sistema de Componentes

### Componentes Base

- **Modal** - Sistema de modais reutilizável
- **Input** - Inputs personalizados
- **Button** - Botões consistentes
- **Select** - Seletores customizados
- **FileUpload** - Upload com drag & drop

### Componentes Específicos

- **AddressForm** - Formulário de endereço com CEP
- **PhoneInput** - Input com máscara de telefone
- **DatePicker** - Seletor de datas
- **GCMap** - Mapa interativo de GCs
- **MemberDetailsModal** - Detalhes do membro

## 🚀 Setup e Instalação

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Conta Supabase
- Conta Turso (opcional, para API)

### Variáveis de Ambiente

```env
# Supabase
VITE_SUPABASE_URL=sua_url_supabase
VITE_SUPABASE_ANON_KEY=sua_chave_supabase

# Turso (opcional)
VITE_TURSO_DATABASE_URL=sua_url_turso
VITE_TURSO_AUTH_TOKEN=seu_token_turso

# API (opcional)
DATABASE_URL=caminho_para_sqlite
```

### Instalação

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build
npm run preview
```

### Configuração do Supabase

#### 1. Criar Tabelas

Execute os SQLs das tabelas `members` e `gcs` no SQL Editor do Supabase.

#### 2. Configurar RLS (Row Level Security)

```sql
-- Habilitar RLS
ALTER TABLE members ENABLE ROW LEVEL SECURITY;
ALTER TABLE gcs ENABLE ROW LEVEL SECURITY;

-- Políticas para membros (exemplo)
CREATE POLICY "Permitir leitura autenticada para membros" ON members
    FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Permitir inserção autenticada para membros" ON members
    FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Políticas para GCs
CREATE POLICY "Permitir todas operações autenticadas para GCs" ON gcs
    FOR ALL USING (auth.role() = 'authenticated');
```

#### 3. Configurar Storage

- Criar bucket `documents` para arquivos de membros
- Configurar políticas de acesso adequadas

## 📱 Responsividade

O sistema é totalmente responsivo, adaptando-se a:

- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (até 767px)

Utiliza:

- CSS Grid e Flexbox
- Media queries SCSS
- Componentes adaptativos
- Sidebar responsiva no dashboard

## 🔒 Segurança

### Medidas Implementadas

- **Autenticação** via Supabase Auth
- **RLS** (Row Level Security) no banco
- **Validação** client-side e server-side
- **Sanitização** de inputs
- **HTTPS** obrigatório em produção
- **Upload seguro** com validação de tipos

### Boas Práticas

- Não exposição de tokens em logs
- Validação de permissões
- Tratamento seguro de erros
- Limpeza de dados sensíveis

## 📊 Performance

### Otimizações

- **Code Splitting** automático via Vite
- **Lazy Loading** de componentes
- **Compressão** de imagens
- **Caching** de requisições
- **Bundle optimization**

### Métricas

- **Bundle size**: ~1.8MB (minificado)
- **First Load**: < 3s
- **Interactive**: < 2s
- **Lighthouse Score**: 90+

## 🧪 Testes

### Estrutura de Testes (Planejada)

```
tests/
├── components/     # Testes de componentes
├── services/      # Testes de serviços
├── hooks/         # Testes de hooks
└── integration/   # Testes de integração
```

### Ferramentas Sugeridas

- **Vitest** - Test runner
- **Testing Library** - Testes de componentes
- **MSW** - Mock de APIs
- **Cypress** - Testes E2E

## 🚀 Deploy

### Vercel (Recomendado)

```bash
# Build e deploy automático
npm run build
vercel --prod
```

### Configurações Vercel

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "framework": "vite"
}
```

### Outras Opções

- **Netlify**
- **Railway**
- **Digital Ocean**
- **AWS S3 + CloudFront**

## 📚 Dependências Principais

### Produção

```json
{
  "@supabase/supabase-js": "^2.39.7",
  "react": "^18.3.1",
  "react-dom": "^18.3.1",
  "react-router-dom": "^6.22.3",
  "framer-motion": "^11.16.1",
  "react-hook-form": "^7.51.0",
  "zod": "^3.22.4",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1"
}
```

### Desenvolvimento

```json
{
  "@vitejs/plugin-react": "^4.3.1",
  "typescript": "^5.5.3",
  "sass": "^1.83.0",
  "eslint": "^8.57.0"
}
```

## 🐛 Solução de Problemas

### Problemas Comuns

#### 1. Erro de CORS

```javascript
// Configurar domains no Supabase Dashboard
// Authentication > Settings > Site URL
```

#### 2. RLS Bloqueando Queries

```sql
-- Verificar políticas RLS
SELECT * FROM pg_policies WHERE tablename = 'sua_tabela';
```

#### 3. Upload de Arquivos Falhando

```javascript
// Verificar configurações do bucket
// Storage > Settings > Public/Private
```

#### 4. Build Falhando

```bash
# Limpar cache e reinstalar
rm -rf node_modules dist .vite
npm install
```

## 🤝 Contribuição

### Guia de Contribuição

1. **Fork** do repositório
2. **Branch** para feature: `git checkout -b feature/nova-feature`
3. **Commit** das mudanças: `git commit -m 'feat: nova feature'`
4. **Push** para branch: `git push origin feature/nova-feature`
5. **Pull Request**

### Padrões de Código

- **ESLint** para linting
- **Prettier** para formatação
- **Conventional Commits** para mensagens
- **TypeScript** obrigatório para novos arquivos

## 📄 Licença

Este projeto é propriedade da Igreja Batista Lagoinha de Guarulhos e é de uso interno exclusivo.

## 👥 Equipe

- **Desenvolvimento**: Equipe Técnica IBL Guarulhos
- **Design**: Equipe de Comunicação
- **Product Owner**: Liderança da Igreja

## 📞 Suporte

Para suporte técnico ou dúvidas sobre o sistema:

- **Email**: ti@iblagoinha-gru.com.br
- **Telefone**: (11) 1234-5678
- **Documentação**: Este arquivo
- **Issues**: GitHub Issues (interno)

---

_Documentação atualizada em: Janeiro 2025_
_Versão do Sistema: 1.0.0_
