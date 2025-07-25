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
- **React Hot Toast** - Notificações
- **Sonner + React Hot Toast** - Sistema de notificações duplo

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
  - **Listagem** com busca e filtros em tempo real
  - **Criação** de novos GCs com validação completa
  - **Edição** de GCs existentes com pré-carregamento de dados
  - **Exclusão** com confirmação obrigatória e notificação
  - **Suporte** a GCs online e presenciais
  - **Gestão** de líderes e co-líderes
  - **Validação** de horários e conflitos
  - **Notificações** toast para feedback do usuário

#### Fluxo de Exclusão de GCs

1. **Clique no botão "Excluir"** na linha do GC
2. **Modal de confirmação** exibe aviso sobre ação irreversível
3. **Confirmação obrigatória** com nome do GC na mensagem
4. **Loading state** durante processamento
5. **Notificação de sucesso** com toast personalizado
6. **Atualização automática** da lista
7. **Fallback** de recarga em caso de erro

### 3. Dashboard Administrativo

- **Localização**: `/pages/Dashboard/`
- **Funcionalidades**:
  - **Lista de membros** com filtros avançados e busca
  - **Gestão completa de GCs** (CRUD com confirmações)
  - **Estatísticas e métricas** em tempo real
  - **Gestão de documentos** com preview e download
  - **Exportação de dados** em formatos diversos
  - **Sistema de notificações** integrado
  - **Confirmações de segurança** para ações críticas
  - **Interface responsiva** para todos os dispositivos
  - **Consolidação de informações** de decisões

#### Melhorias de UX Implementadas

- **Confirmação obrigatória** antes de exclusões
- **Loading states** visuais durante operações
- **Notificações toast** para feedback imediato
- **Atualização automática** de listas após mudanças
- **Tratamento robusto** de erros com fallbacks
- **Design consistente** em todos os modais

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
  // ... campos de endereço (street, number, neighborhood, city, state, country)
}

// Principais funções
- createGC(gcData: Omit<GC, 'id' | 'created_at'>): Promise<GC>
- getGCs(): Promise<GC[]>
- getGCById(id: string): Promise<GC | null>
- updateGC(id: string, gcData: Partial<GC>): Promise<GC>
- deleteGC(id: string): Promise<boolean>

// Funcionalidades de cada método:
// - createGC: Validação de dados, criação no Supabase
// - getGCs: Busca todos os GCs ordenados por data de criação
// - getGCById: Busca GC específico por ID
// - updateGC: Atualização parcial de campos
// - deleteGC: Exclusão permanente com retorno de sucesso/erro
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
- **ConfirmationModal** - Modal de confirmação reutilizável
- **SearchFilter** - Componente de busca em tempo real
- **MessageModal** - Modal para envio de mensagens WhatsApp

#### ConfirmationModal

Componente reutilizável para confirmações críticas:

```typescript
interface ConfirmationModalProps {
  isOpen: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => void
  onCancel: () => void
  isLoading?: boolean
}

// Características:
// - Design consistente com ícone de alerta
// - Loading state integrado
// - Acessibilidade (ARIA labels)
// - Responsivo para mobile
// - Integração com sistema de toast
```

## 🔔 Sistema de Notificações e UX

### React Hot Toast

Implementação de notificações elegantes e acessíveis:

```typescript
import toast from 'react-hot-toast'

// Notificações de sucesso
toast.success('GC "Nome do GC" foi excluído com sucesso!', {
  duration: 4000,
  position: 'top-right'
})

// Notificações de erro
toast.error('Erro ao excluir GC. Tente novamente.')

// Configuração global no App.tsx
<Toaster position="top-right" />
```

### Padrões de UX

#### Feedback Imediato

- **Loading states** em todas as operações assíncronas
- **Confirmações** para ações destrutivas
- **Notificações** para feedback de sucesso/erro
- **Estados vazios** informativos

#### Acessibilidade

- **ARIA labels** em componentes interativos
- **Focus management** em modais
- **Keyboard navigation** completa
- **Screen reader** compatibility

#### Responsividade

- **Mobile first** approach
- **Touch-friendly** interfaces
- **Adaptive layouts** para diferentes telas
- **Progressive enhancement**

## 🆕 Atualizações Recentes

### Versão 1.1.0 - Janeiro 2025

#### ✨ Novas Funcionalidades

- **Exclusão de GCs com Confirmação**

  - Modal de confirmação obrigatória antes da exclusão
  - Mensagem personalizada com nome do GC
  - Loading state durante o processo
  - Notificação de sucesso com toast
  - Tratamento de erros robusto

- **Sistema de Notificações Aprimorado**

  - Integração completa do React Hot Toast
  - Notificações de sucesso e erro contextualizadas
  - Configuração global no App.tsx
  - Posicionamento consistente (top-right)

- **Melhorias de UX**
  - Feedback visual imediato em todas as operações
  - Estados de loading em botões críticos
  - Confirmações para ações destrutivas
  - Atualização automática de listas

#### 🔧 Melhorias Técnicas

- **Refatoração Completa do Código**

  - Remoção de logs de debug
  - Limpeza de código comentado
  - Simplificação do tratamento de erros
  - Padronização de componentes

- **Documentação Atualizada**
  - Seções reorganizadas e expandidas
  - Exemplos de código atualizados
  - Novos fluxos documentados
  - Padrões de UX formalizados

#### 🐛 Correções

- **Compilação TypeScript**

  - Correção de exports duplicados
  - Validação de tipos aprimorada
  - Build otimizado

- **Gerenciamento de Estado**
  - Sincronização melhorada entre componentes
  - Fallbacks para casos de erro
  - Prevenção de memory leaks

## �️ Roadmap e Funcionalidades Futuras

### 📈 Versão 1.2.0 - Analytics e Relatórios (Março 2025)

#### Dashboard Avançado

```typescript
interface DashboardMetrics {
  totalMembers: number
  newMembersThisMonth: number
  activeGCs: number
  growthRate: number
  engagementScore: number
}

// Componentes planejados
;-MembersGrowthChart - GCEngagementMetrics - ConversionFunnel - ActivityHeatmap
```

#### Sistema de Relatórios

- **Relatórios Personalizáveis**: Builder visual de relatórios
- **Agendamento**: Envio automático de relatórios por email
- **Exportação Avançada**: PDF com gráficos, Excel dinâmico
- **Filtros Inteligentes**: Por período, idade, bairro, GC

### 🔐 Versão 1.3.0 - Segurança e Auditoria (Maio 2025)

#### Sistema de Permissões

```typescript
enum UserRole {
  SUPER_ADMIN = 'super_admin',
  ADMIN = 'admin',
  PASTOR = 'pastor',
  LEADER = 'leader',
  VIEWER = 'viewer'
}

interface Permission {
  resource: string
  actions: ('create' | 'read' | 'update' | 'delete')[]
  conditions?: Record<string, any>
}
```

#### Auditoria Completa

- **Log de Ações**: Todas as operações CRUD registradas
- **Histórico de Alterações**: Timeline de mudanças por registro
- **Backup Incremental**: Versionamento automático com rollback
- **Compliance**: Relatórios para auditoria interna

### 📱 Versão 1.4.0 - Mobile e PWA (Julho 2025)

#### Progressive Web App

```typescript
// Service Worker para cache offline
interface PWAFeatures {
  offlineSupport: boolean
  pushNotifications: boolean
  backgroundSync: boolean
  installPrompt: boolean
}
```

#### App Mobile Nativo (React Native)

- **Sincronização Offline**: CRUD local com sync automático
- **Notificações Push**: Lembretes e atualizações importantes
- **Scanner QR**: Check-in rápido em eventos
- **Geofencing**: Notificações por proximidade de GC

### 🔄 Versão 2.0.0 - Plataforma Completa (Setembro 2025)

#### Multi-Tenancy

```typescript
interface TenantConfig {
  id: string
  name: string
  domain: string
  customization: ThemeConfig
  features: FeatureFlags
  billing: BillingPlan
}
```

#### Marketplace de Integrações

- **API Pública**: RESTful e GraphQL
- **Webhooks**: Eventos em tempo real
- **SDK JavaScript**: Para desenvolvedores terceiros
- **App Store**: Plugins e extensões da comunidade

#### Funcionalidades Empresariais

- **White Label**: Customização completa de marca
- **SSO/SAML**: Integração com Active Directory
- **API Rate Limiting**: Controle de uso por tenant
- **Métricas Multitenancy**: Dashboard por organização

### 🛠️ Melhorias Técnicas Contínuas

#### Performance e Escalabilidade

```typescript
// Otimizações planejadas
interface PerformanceTargets {
  firstContentfulPaint: '< 1.5s'
  largestContentfulPaint: '< 2.5s'
  cumulativeLayoutShift: '< 0.1'
  timeToInteractive: '< 3s'
}
```

#### Qualidade de Código

- **Cobertura de Testes**: Meta de 90%+ em todas as funcionalidades
- **Documentação Automatizada**: Storybook para componentes
- **Análise Estática**: SonarQube para qualidade contínua
- **Performance Monitoring**: Sentry + Web Vitals

#### DevOps e Infraestrutura

- **CI/CD Avançado**: Deploy por ambiente com aprovações
- **Monitoramento**: Grafana + Prometheus + Alertas
- **Backup Geográfico**: Replicação multi-região
- **Disaster Recovery**: RTO < 1h, RPO < 15min

### 🎯 Objetivos de Longo Prazo

#### Impacto na Igreja

- **Crescimento**: Facilitar crescimento de 20% ao ano
- **Engajamento**: Aumentar participação em GCs em 30%
- **Eficiência**: Reduzir tempo administrativo em 50%
- **Dados**: Decisões baseadas em dados precisos

#### Expansão Estratégica

- **Rede IBL**: Implementação em todas as unidades
- **Outras Denominações**: Adaptação para diferentes contextos
- **Internacional**: Suporte a múltiplos idiomas
- **Franchising**: Modelo de licenciamento para outras igrejas

## �🚀 Setup e Instalação

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
  "react-hot-toast": "^2.4.1",
  "sonner": "^1.7.3",
  "zod": "^3.22.4",
  "leaflet": "^1.9.4",
  "react-leaflet": "^4.2.1",
  "lucide-react": "^0.344.0",
  "styled-components": "^6.1.8"
}
```

### Desenvolvimento

```json
{
  "@vitejs/plugin-react": "^4.3.1",
  "typescript": "^5.5.3",
  "sass": "^1.83.0",
  "eslint": "^8.57.0",
  "@types/react": "^18.3.3",
  "@types/react-dom": "^18.3.0"
}
```

### Bibliotecas de Destaque

- **react-hot-toast**: Sistema de notificações elegante e acessível
- **sonner**: Biblioteca alternativa de toast (backup)
- **lucide-react**: Ícones modernos e consistentes
- **framer-motion**: Animações fluidas e performáticas
- **styled-components**: CSS-in-JS com TypeScript

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
_Versão do Sistema: 1.1.0_
_Última atualização: 25/01/2025_

### 📋 Changelog

#### v1.1.0 (25/01/2025)

- ✨ **Nova**: Funcionalidade de exclusão de GCs com confirmação
- ✨ **Nova**: Sistema de notificações toast integrado
- 🔧 **Melhoria**: Refatoração completa do código
- 🔧 **Melhoria**: UX aprimorada com feedback visual
- 📚 **Docs**: Documentação completamente atualizada
- 🐛 **Fix**: Correções de compilação TypeScript

#### v1.0.0 (Janeiro 2025)

- 🎉 **Lançamento**: Versão inicial do sistema
- ✨ **Feature**: Cadastro completo de membros
- ✨ **Feature**: Gestão de GCs (CRUD básico)
- ✨ **Feature**: Dashboard administrativo
- ✨ **Feature**: Sistema de mapas
- ✨ **Feature**: Autenticação com Supabase
