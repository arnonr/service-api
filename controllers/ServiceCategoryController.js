const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const filterData = (req) => {
  let $where = {
    deleted_at: null,
  };

  if (req.query.id) {
    $where["id"] = parseInt(req.query.id);
  }

  if (req.query.lang && req.query.lang == "en") {
    $where["name_en"] = {
      not: null,
    };
  }

  if (req.query.name_th) {
    $where["name_th"] = {
      contains: req.query.name_th,
      //   mode: "insensitive",
    };
  }

  if (req.query.name_en) {
    $where["name_en"] = {
      contains: req.query.name_en,
      //   mode: "insensitive",
    };
  }

  if (req.query.name) {
    if (req.query.lang && req.query.lang == "th") {
      $where["name_th"] = {
        contains: req.query.name,
      };
    } else {
      $where["name_en"]["contains"] = req.query.name;
    }
  }

  if (req.query.is_publish) {
    $where["is_publish"] = parseInt(req.query.is_publish);
  }

  return $where;
};

// หาจำนวนทั้งหมดและลำดับ
const countDataAndOrder = async (req, $where) => {
  //   Order
  let $orderBy = {};
  if (req.query.orderBy) {
    $orderBy[req.query.orderBy] = req.query.order;
  } else {
    $orderBy = { created_at: "asc" };
  }

  //Count
  let $count = await prisma.service_category.findMany({
    where: $where,
  });

  $count = $count.length;
  let $perPage = req.query.perPage ? Number(req.query.perPage) : 20;
  let $currentPage = req.query.currentPage ? Number(req.query.currentPage) : 1;
  let $totalPage =
    Math.ceil($count / $perPage) == 0 ? 1 : Math.ceil($count / $perPage);
  let $offset = $perPage * ($currentPage - 1);

  return {
    $orderBy: $orderBy,
    $offset: $offset,
    $perPage: $perPage,
    $count: $count,
    $totalPage: $totalPage,
    $currentPage: $currentPage,
  };
};

// ฟิลด์ที่ต้องการ Select รวมถึง join
const selectField = {
  id: true,
  name_th: true,
  name_en: true,
  detail_th: true,
  detail_en: true,
  is_publish: true,
  name: true,
  detail: true,
};

const checkLanguage = (req) => {
  let prismaLang = prisma.$extends({
    result: {
      service_category: {
        name: {
          needs: { name_th: true },
          compute(table) {
            return req.query.lang && req.query.lang == "en"
              ? table.name_en
              : table.name_th;
          },
        },
        detail: {
          needs: { detail_th: true },
          compute(table) {
            return req.query.lang && req.query.lang == "en"
              ? table.detail_en
              : table.detail_th;
          },
        },
      },
    },
  });

  return prismaLang;
};

const cutFroala = (detail) => {
  let detail_success =
    detail != null
      ? detail
          .replaceAll("Powered by", "")
          .replaceAll(
            '<p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">',
            ""
          )
          .replaceAll(
            '<a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">',
            ""
          )
          .replaceAll("Froala Editor</a></p>", "")
      : undefined;
  return detail_success;
};

const methods = {
  async onGetAll(req, res) {
    try {
      let $where = filterData(req);
      let other = await countDataAndOrder(req, $where);

      let prismaLang = checkLanguage(req);

      const item = await prismaLang.service_category.findMany({
        select: selectField,
        where: $where,
        orderBy: other.$orderBy,
        skip: other.$offset,
        take: other.$perPage,
      });

      res.status(200).json({
        data: item,
        totalData: other.$count,
        totalPage: other.$totalPage,
        currentPage: other.$currentPage,
        lang: req.query.lang ? req.query.lang : "",
        msg: " success",
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  async onGetById(req, res) {
    try {
      let prismaLang = checkLanguage(req);
      const item = await prismaLang.service_category.findUnique({
        select: selectField,
        where: {
          id: Number(req.params.id),
        },
      });

      res.status(200).json({
        data: item,
        msg: " success",
      });
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },

  // สร้าง
  async onCreate(req, res) {
    try {
      const item = await prisma.service_category.create({
        data: {
          name_th: req.body.name_th,
          name_en: req.body.name_en,
          detail_th:
            req.body.detail_th != null ? cutFroala(req.body.detail_th) : undefined,
          detail_en:
            req.body.detail_en != null ? cutFroala(req.body.detail_en) : undefined,
          is_publish: Number(req.body.is_publish),
          created_by: "arnonr",
          updated_by: "arnonr",
        },
      });

      res.status(201).json({ ...item, msg: "success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },

  // แก้ไข
  async onUpdate(req, res) {
    try {
      const item = await prisma.service_category.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          name_th: req.body.name_th != null ? req.body.name_th : undefined,
          name_en: req.body.name_en != null ? req.body.name_en : undefined,
          detail_th:
            req.body.detail_th != null ? cutFroala(req.body.detail_th) : undefined,
          detail_en:
            req.body.detail_en != null ? cutFroala(req.body.detail_en) : undefined,
          is_publish: Number(req.body.is_publish),
          updated_by: "arnonr",
        },
      });

      res.status(200).json({ ...item, msg: "success" });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
  // ลบ
  async onDelete(req, res) {
    try {
      await prisma.service_category.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          deleted_at: new Date().toISOString(),
        },
      });

      res.status(200).json({
        msg: "success",
      });
    } catch (error) {
      res.status(400).json({ msg: error.message });
    }
  },
};

module.exports = { ...methods };
