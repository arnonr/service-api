const { PrismaClient } = require("@prisma/client");
const uploadController = require("./UploadsController");

// select แบบพิเศษ
const prisma = new PrismaClient().$extends({
  result: {
    banner: {
      banner_file: {
        needs: { banner_file: true },
        compute(banner) {
          let banner_file = null;
          if (banner.banner_file != null) {
            banner_file = process.env.PATH_UPLOAD + banner.banner_file;
          }
          return banner_file;
        },
      },
    },
  },
});

// ค้นหา
const filterData = (req) => {
  let $where = {
    deleted_at: null,
  };

  if (req.query.id) {
    $where["id"] = parseInt(req.query.id);
  }

  if (req.query.title_th) {
    $where["title_th"] = {
      contains: req.query.title_th,
    };
  }

  if (req.query.title_en) {
    $where["title_en"] = {
      contains: req.query.title_en,
    };
  }

  if (req.query.is_publish) {
    $where["is_publish"] = parseInt(req.query.is_publish);
  }

  if (req.query.created_year) {
    $where["created_banner"] = {
      gte: new Date(req.query.created_year + "-01-01 00:00:00").toISOString(),
      lte: new Date(req.query.created_year + "-12-31 23:59:00").toISOString(),
    };
  }

  if (req.query.created_month) {
    $where["created_banner"] = {
      gte: new Date(
        req.query.created_year + "-" + req.query.created_month + "-01 00:00:00"
      ).toISOString(),
      lte: new Date(
        req.query.created_year + "-" + req.query.created_month + "-31 23:59:00"
      ).toISOString(),
    };
  }

  if (req.query.created_banner) {
    $where["created_banner"] = {
      gte: new Date(req.query.created_banner + " 00:00:00").toISOString(),
      lte: new Date(req.query.created_banner + " 23:59:00").toISOString(),
    };
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
    $orderBy = { created_at: "desc" };
  }

  //Count
  let $count = await prisma.banner.findMany({
    // select: selectField,
    where: $where,
  });

  $count = $count.length;
  let $perPage = req.query.perPage ? Number(req.query.perPage) : 10;
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
  title_th: true,
  title_en: true,
  banner_file: true,
  banner_url: true,
  is_publish: true,
  count_views: true,
  created_banner: true,
  title: true,
};

// ปรับ Language
const checkLanguage = (req) => {
  let prismaLang = prisma.$extends({
    result: {
      banner: {
        title: {
          needs: { title_th: true },
          compute(banner) {
            return req.query.lang && req.query.lang == "en"
              ? banner.title_en
              : banner.title_th;
          },
        },
      },
    },
  });

  return prismaLang;
};

const methods = {
  // ค้นหาทั้งหมด
  async onGetAll(req, res) {
    try {
      let $where = filterData(req);
      let other = await countDataAndOrder(req, $where);

      let prismaLang = checkLanguage(req);

      const item = await prismaLang.banner.findMany({
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
      });
    } catch (error) {
      res.status(500).json({ msg: error.message });
    }
  },

  // ค้นหาเรคคอร์ดเดียว
  async onGetById(req, res) {
    try {
      let prismaLang = checkLanguage(req);

      const item = await prismaLang.banner.findUnique({
        select: selectField,
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({ data: item });
    } catch (error) {
      res.status(404).json({ msg: error.message });
    }
  },

  // สร้าง
  async onCreate(req, res) {
    try {
      let pathFile = await uploadController.onUploadFile(
        req,
        "/images/banner/",
        "banner_file"
      );

      if (pathFile == "error") {
        return res.status(500).send("error");
      }

      const item = await prisma.banner.create({
        data: {
          title_th: req.body.title_th,
          title_en: req.body.title_en,
          banner_file: pathFile,
          banner_url: req.body.banner_url,
          is_publish: Number(req.body.is_publish),
          created_banner: new Date(req.body.created_banner),
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
      let pathFile = await uploadController.onUploadFile(
        req,
        "/images/banner/",
        "banner_file"
      );

      if (pathFile == "error") {
        return res.status(500).send("error");
      }

      const item = await prisma.banner.update({
        where: {
          id: Number(req.params.id),
        },
        data: {
          title_th: req.body.title_th != null ? req.body.title_th : undefined,
          title_en: req.body.title_en != null ? req.body.title_en : undefined,
          banner_file: pathFile != null ? pathFile : undefined,
          banner_url:
            req.body.banner_url != null ? req.body.banner_url : undefined,
          is_publish:
            req.body.is_publish != null
              ? Number(req.body.is_publish)
              : undefined,
          created_banner:
            req.body.created_banner != null
              ? new Date(req.body.created_banner)
              : undefined,
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
      const item = await prisma.banner.update({
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
